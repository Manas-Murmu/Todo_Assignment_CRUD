const Todo = require("../models/todo");

exports.home = (req, res) => {
  res.send("Hello HomePage");
};

exports.createTodo = async (req, res) => {
  try {
    // const userId = req.params;
    // console.log(userId);
    const { title, tasks } = req.body;

    if (!title) {
      throw new Error("Title is Required");
    }

    const newTodo = new Todo({
      title: req.body.title,
      tasks: req.body.tasks,
      // userId: userId.id,
    });

    const createdNewTodo = await newTodo.save();
    res.status(200).json({
      success: true,
      message: "Todo Created Succesfully",
      createdNewTodo,
      //userId,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const allTodos = await Todo.find({ userId });
    res.status(200).json({
      success: true,
      allTodos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Id Doesn't Exist",
    });
  }
};

exports.deleteATodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Todo Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editATodo = async (req, res) => {
  try {
    const editTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Todo Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      Error: error.message,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const userId = req.params.id;
    const value = Todo.findOne({ userId: userId }, function (err, myUser) {
      console.log(myUser);
      res.status(200).json({
        success: true,
        myUser,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
