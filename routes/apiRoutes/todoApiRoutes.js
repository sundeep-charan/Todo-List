var express = require("express");
var router = express.Router();
var authenticate = require('../../middlewares/authenticate');
var todoAPIController = require("../../controllers/apiControllers/todoApiControllers");
// Today's tasks (these are created by a user only. IN other words we need to make sure that the user is sending the accessToken)

// CREATE Todos.
// title, body, isCompleted, createdAt, user
router.post("/todos/create", authenticate, todoAPIController.createTodo);

// UPDATE todos by id.
router.patch("/todos/update/:todoId", authenticate, todoAPIController.updateTodoById);

// DELETE todos by id.
router.delete("/todos/delete/:todoId", authenticate, todoAPIController.deleteTodoById);

module.exports = router;
