// In-memory task store
// Kept intentionally simple for assignment evaluation
let taskStore = [];

/**
 * GET /tasks
 * Supports optional filtering by status
 */
export const fetchTasks = (req, res) => {
  let userTasks = taskStore.filter(
    task => task.userId === req.user.id
  );

  if (req.query.status) {
    userTasks = userTasks.filter(
      task => task.status === req.query.status
    );
  }

  res.status(200).json(userTasks);
};

/**
 * POST /tasks
 */
export const addTask = (req, res) => {
  const { title, description, due_date } = req.body;

  // Collect missing fields instead of failing immediately
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!due_date) missingFields.push("due_date");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      fields: missingFields,
    });
  }

  const newTask = {
    id: Date.now().toString(),
    userId: req.user.id,
    title,
    description: description || "",
    status: "pending",
    due_date,
    created_at: new Date().toISOString(),
    completed_at: null, // added for Kanban completion tracking
  };

  taskStore.push(newTask);
  res.status(201).json(newTask);
};

/**
 * PATCH /tasks/:id/status
 * Status-only endpoint to support Kanban workflow
 */
export const changeTaskStatus = (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["pending", "in-progress", "completed"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  const task = taskStore.find(
    t => t.id === req.params.id && t.userId === req.user.id
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.status = status;

  // Track completion timestamp for uniqueness
  if (status === "completed") {
    task.completed_at = new Date().toISOString();
  }

  res.status(200).json(task);
};

/**
 * DELETE /tasks/:id
 */
export const removeTask = (req, res) => {
  const index = taskStore.findIndex(
    t => t.id === req.params.id && t.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  taskStore.splice(index, 1);
  res.status(204).send();
};
