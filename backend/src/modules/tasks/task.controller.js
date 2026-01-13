let tasks = [];

export const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

export const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || "",
    status: "pending",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};
