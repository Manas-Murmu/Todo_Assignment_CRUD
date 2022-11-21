const Todo = require("../models/todo");

exports.createTaskTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) return res.status(400).send("No todo exists");
  const { tasks } = req.body;
  todo.tasks.push(tasks);
  await todo.save();
  res.json(todo);
};
