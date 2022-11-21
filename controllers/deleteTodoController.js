import Todo from '../model/Todo'

export async function deleteTodoController (req, res) {
    const todoId = req.params.todoId
    const deletedTodo = await Todo.findByIdAndDelete(todoId)
    res.status(201).json(deletedTodo)
}