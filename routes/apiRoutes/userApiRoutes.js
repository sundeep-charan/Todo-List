// Import the express module
var express = require("express");
var authenticate = require("../../middlewares/authenticate");
var userApiControllers = require("../../controllers/apiControllers/userApiControllers");

// Instance of a router is created with express.Router()
var router = express.Router();

router.post("/users/register", userApiControllers.registerUser);

router.post("/users/login", userApiControllers.loginUser);

router.delete("/users/logout", authenticate, userApiControllers.logOutUser);

module.exports = router;
