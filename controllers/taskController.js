const Todo = require("../models/todo");

exports.createTaskTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(400).send("No todo Id exists");
    const { tasks } = req.body;
    todo.tasks.push(tasks);
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "No Todo Exists",
      error: error.message,
    });
  }
};

// exports.deleteATaskInTodo = async (req, res) => {
//   // try {
//   //   const tasksTodo = req.body;
//   //   console.log(tasksTodo);
//   //   const { tasksId } = req.params;
//   //   // console.log(tasksId);
//   //   const todo = await Todo.find(tasksId);
//   //   console.log(todo);
//   //   todo.map((task) => {
//   //     console.log(task.tasks);
//   //     const taskArray = task.tasks;
//   //     taskArray.remove(tasksId);
//   //   });
//   // } catch (error) {
//   //   res.status(400).json({
//   //     success: false,
//   //     error: error.message,
//   //   });
//   // }

//   try {
//     const { id } = req.params;
//     const tasks = req.body.tasks;

//     //console.log(tasks);
//     // tasks.map((task) => {
//     //   var tasksArray = task.tasks;
//     // });

//     const event = await Todo.findById(id);
//     const taskArray = event.tasks;
//     console.log(taskArray);

//     if (taskArray.includes(tasks)) {
//       console.log("Task Avalaible");
//       taskArray.remove(tasks);
//       console.log(taskArray);
//       event.save();
//     } else {
//       res.json({
//         message: "Task Not Avalaible",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Task Deleted Succesfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

exports.deleteATaskInTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = req.body.tasks;

    //console.log(tasks);
    // tasks.map((task) => {
    //   var tasksArray = task.tasks;
    // });

    const event = await Todo.findById(id);
    const taskArray = event.tasks;
    console.log(taskArray);

    if (taskArray.includes(tasks)) {
      console.log("Task Avalaible");
      taskArray.remove(tasks);
      console.log(taskArray);
      event.save();
    } else {
      res.json({
        message: "Task Not Avalaible",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

exports.editATaskInTodo = async (req, res) => {
  try {
    const test = req.body;
    console.log(test);
    const editATask = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Task edited Succesfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getATaskInTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    const Tasks = todo.tasks;
    res.status(200).json({
      success: true,
      Tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
