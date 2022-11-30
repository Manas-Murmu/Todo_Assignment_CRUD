const express = require("express");
const app = express();
const connectToDb = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", todoRoutes);
app.use("/", taskRoutes);
app.use("/", userRoutes);

//Db Connection
connectToDb();

module.exports = app;
