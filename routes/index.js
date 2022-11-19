const express = require("express");
const routes = express.Router();

const { isAuth } = require("../middleware")
const { userController, animeController, chapterController }  = require("../controller")
const { userSchema }  = require("../controller/schemas")

// Rutas de user
routes.get("/login", userController.login)
routes.post("/register", userSchema, userController.register)
routes.get("/test", isAuth , userController.test)
// routes.post("/favorite", userController.favorite)

// Rutas de anime
routes.get("/allAnime", animeController.getAllAnimes)
routes.get("/oneAnime", animeController.getOneAnime)
routes.delete("/deleteAnime", animeController.deleteAnime)
routes.put("/updateAnime", animeController.updateAnime)
routes.post("/createAnime", animeController.createAnime)

// Rutas de capitulos
routes.get("/getAllChapters", chapterController.getAllChapters)
routes.post("/createCapter", chapterController.createCapter)
routes.delete("/deleteChapter", chapterController.deleteChapter)
routes.put("/updateChapter", chapterController.updateChapter)



module.exports = routes;
