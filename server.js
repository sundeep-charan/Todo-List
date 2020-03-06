var express = require("express");
var hbs = require("hbs");
var path = require("path");
var methodOverride = require("method-override");
var dotenv = require("dotenv");
dotenv.config()
var session = require("express-session");
var User = require("./models/User");
var Todo = require("./models/Todo");
require("./utils/hbs");
require("./db");

// Routes of both API as well as normal
var todoAPIRoutes = require("./routes/apiRoutes/todoApiRoutes");
var userAPIRoutes = require("./routes/apiRoutes/userApiRoutes");
var todoNormalRoutes = require("./routes/normalRoutes/todoNormalRoutes");
var userNormalRoutes = require("./routes/normalRoutes/userNormalRoutes");

// Init
var app = express();

// Setting HBS as template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "layout" });

// Registering hbs partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));

// Adding custom request type override query key name
app.use(methodOverride("cadbury"));

// Adding the session capabilities
app.use(
  session({
    secret: "todosAPIexpressappsecret",
    resave: false,
    name: "todoSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.use(userNormalRoutes);
app.use(todoNormalRoutes);
app.use(userAPIRoutes);
app.use(todoAPIRoutes);

app.get("/", function(req, res) {
  return res.render("index", {
    title: "Home page",
    userId: req.session.userId
  });
});

app.get("/dummyRoute", function(req, res) {
  User.find()
    .populate("todos")
    .then(function(users) {
      console.log(users);
      return Todo.find().populate("user", ["name", "email"]);
    })
    .then(function(todos) {
      return res.json(todos);
    })
    .catch(function(err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    });
});

app.listen(1234, function() {
  console.log("Server started");
});
