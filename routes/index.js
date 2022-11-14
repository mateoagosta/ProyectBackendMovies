const express = require("express");
const routes = express.Router();

const { isAuth } = require("../middleware")
const { userController }  = require("../controller")
const { userSchema }  = require("../controller/schemas")

routes.post("/login", userController.login)
routes.post("/register", userSchema, userController.register)
routes.get("/test", isAuth , userController.test)

module.exports = routes;
