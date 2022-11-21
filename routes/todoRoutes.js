const express = require("express");
const {
  home,
  createTodo,
  getAllTodos,
  getSingleTodo,
  deleteATodo,
} = require("../controllers/todoController");
const router = express.Router();

router.get("/", home);
router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.get("/getSingleTodo/:id", getSingleTodo);
router.delete("/deleteATodo/:id", deleteATodo);

module.exports = router;
