import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json());

app.use("/people", usersRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

export default app;
