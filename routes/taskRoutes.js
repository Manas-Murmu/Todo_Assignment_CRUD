const express = require("express");
const { createTaskTodo } = require("../controllers/taskController");

const router = express.Router();

router.post("/createTaskTodo/:id", createTaskTodo);

module.exports = router;
