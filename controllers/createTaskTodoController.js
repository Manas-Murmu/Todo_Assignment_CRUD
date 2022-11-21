import Todo from "../model/Todo";

// export async function createTaskTodoController (req, res) {

//     const todoId = req.params.todoId
//     const todo = await Todo.findById(todoId)
//     if(!todo) return res.status(400).send('No todo exists')
//     const {text} = req.body
//     todo.tasks.push(text)
//     await todo.save()
//     res.json(todo)
// }

exports.home = (req, res) => {
  res.send("Hello HomePage");
};
