/* eslint-disable no-unused-vars */
import express from "express";
import session from "express-session";

import passport from "./config/passport.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "dev-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.use("/tasks", requireAuth, taskRoutes);

// app.get("/", (req, res) => {
//   res.send("API running");
// });
app.get("/", (req, res) => {
  res.send("Task Management API is running 🚀");
});


export default app;
