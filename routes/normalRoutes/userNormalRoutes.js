var express = require("express");
var router = express.Router();
var userNormalController = require("../../controllers/normalControllers/userNormalControllers");

// Register page
router.get("/register", userNormalController.renderRegisterPage);

// Login page
router.get("/login", userNormalController.renderLoginPage);

module.exports = router;
