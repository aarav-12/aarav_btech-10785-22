import Task from "./task.model.js";

// GET /tasks?status=pending
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(400).json({ message: "Failed to create task" });
  }
};

// PATCH /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTask);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(400).json({ message: "Failed to update task" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task" });
  }
};
