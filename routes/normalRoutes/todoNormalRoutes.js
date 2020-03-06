var express = require("express");
var router = express.Router();
var authenticate = require("../../middlewares/authenticate");
var todoNormalControllers = require("../../controllers/normalControllers/todoNormalControllers");

// Dashboard page
router.get("/todos", authenticate, todoNormalControllers.renderTodosPage);

// Create todo page
router.get("/todo/create", authenticate, todoNormalControllers.renderTodoCreatePage);

// Update todo page
router.get("/todo/update/:todoId", authenticate, todoNormalControllers.renderUpdateTodoPage);

module.exports = router;
