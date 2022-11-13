const express = require("express");
const routes = express.Router();
const { isAuth } = require("../middleware")

const{ usersController } = require("../controller/userController")

routes
    .post("/login", usersController.login)
    .post("/register", usersController.register)
    .post("/test", isAuth , usersController.test)

module.exports = routes;