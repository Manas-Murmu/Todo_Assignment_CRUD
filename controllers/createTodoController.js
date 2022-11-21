// createTodoController

import Todo from "../model/Todo";

export async function createTodoController(req, res) {
  const newTodo = new Todo({
    title: req.body.title,
  });
  const createdNewTodo = await newTodo.save();
  res.json(createdNewTodo);

  //try catch
  // if title is empty or not
  // there should be status code
}
