import express from "express";
import taskRoutes from "./modules/tasks/task.routes.js";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
