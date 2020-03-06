var Todo = require("../../models/Todo");

module.exports = {
  renderTodosPage: function(req, res) {
    var user = req.user;
    Todo.find({ user: req.user._id })
      .then(function(todos) {
        return res.render("dashboard", {
          userId: user.id,
          name: user.name,
          todos: todos,
          length: todos.length
        });
      })
      .catch(function(err) {
        console.log(err.message);
        return res.status(500).send("Server error");
      });
  },

  renderTodoCreatePage: function(req, res) {
    res.render("todoCreate", {
      userId: req.user.id,
      title: "Todo create page"
    });
  },

  renderUpdateTodoPage: function(req, res) {
    var user = req.user;
    var todoId = req.params.todoId;
    Todo.findById(todoId)
      .then(function(todo) {
        return res.render("todoUpdate", {
          title: "Todo update page",
          userId: user.id,
          todo: todo
        });
      })
      .catch(function(err) {
        return res.status(500).send(`Server Error ${err.message}`);
      });
  }
};
