import express from "express";
import {
  fetchTasks,
  addTask,
  changeTaskStatus,
  removeTask,
} from "./task.controller.js";

const router = express.Router();

router.get("/", fetchTasks);
router.post("/", addTask);
router.patch("/:id/status", changeTaskStatus);
router.delete("/:id", removeTask);

export default router;
