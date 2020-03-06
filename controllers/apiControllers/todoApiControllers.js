// API controller for todos.
var Todo = require("../../models/Todo");

module.exports = {
  createTodo: function(req, res) {
    var user = req.user;
    // Create a TODO object
    var todo = new Todo({ ...req.body });
    // Wire the currently logged in user to the new todo.
    todo.user = user._id;
    user.todos.push(todo._id);
    // Saving the new todo into the user's todo array
    user
      .save()
      .then(function() {
        console.log("User has successfully added the new Todo");
      })
      .catch(function(err) {
        console.log(err);
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        return res.status(500).send("Server Error");
      });

    // Saving the new todo inside Todo table.
    todo
      .save()
      .then(function() {
        return res.redirect("/todos");
      })
      .catch(function(err) {
        console.log(err.messsage);
        return res.status(500).send("Server Error");
      });
  },

  updateTodoById: function(req, res) {
    var todoId = req.params.todoId;
    /* 
      I think many people didnt understand this logic below on line 56
      Its easy peeps. 2 === 1 is false right ? 2 === 2 is true right? The bool value is directly stored onto isCompleted, instead of this huge following code 
      
      var isCompleted;
      if (req.body.isCompleted === "on") {
        isCompleted = true;
      } else { 
        isCompleted = false;
      }

      Anyways the equality is gonna give a boolean, so I used that to my advantage. Hope you get that part.
    */
    var isCompleted = req.body.isCompleted === "on";
    // Fricking mistake of mine. I should have used req.body and not req.params. Silly me lol

    var userId = req.user.id;
    Todo.updateOne(
      { _id: todoId, user: userId },
      { ...req.body, isCompleted: isCompleted },
      { new: true }
    )
      .then(function(todo) {
        if (!todo) return res.status(404).send("Todo not found");

        res.redirect("/todos");
      })
      .catch(function(err) {
        if (err.name === "CastError")
          return res.status(400).send("Invalid Todo ID");
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        return res.status(500).send("Server Error");
      });
  },

  deleteTodoById: function(req, res) {
    var todoId = req.params.todoId;
    var userId = req.user.id;
    var todoId = req.params.todoId;
    var userId = req.user.id;
    Todo.deleteOne({ _id: todoId, user: userId })
      .then(function(todo) {
        if (!todo) return res.status(404).send("Todo not found");
        res.redirect("/todos");
      })
      .catch(function(err) {
        if (err.name === "CastError")
          return res.status(400).send("Invalid Todo ID");
        console.log(err);
        return res.status(500).send("Server Error");
      });
  }
};
