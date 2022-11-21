const Todo = require("../models/todo");

exports.home = (req, res) => {
  res.send("Hello HomePage");
};

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks } = req.body;
    if (!title || !tasks) {
      throw new Error("Title and Tasks are Required");
    }

    const newTodo = new Todo({
      title: req.body.title,
      tasks: req.body.tasks,
    });
    const createdNewTodo = await newTodo.save();
    res.status(200).json({
      success: true,
      message: "Todo Created Succesfully",
      createdNewTodo,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
