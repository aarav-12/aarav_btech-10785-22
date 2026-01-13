import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "TASK ROUTE WORKS" });
});

export default router;
