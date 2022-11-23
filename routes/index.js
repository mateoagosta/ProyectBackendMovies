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
routes.get("/oneAnime/:_id", animeController.getOneAnime)
routes.delete("/deleteAnime/:_id", animeController.deleteAnime)
routes.put("/updateAnime/:_id", animeController.updateAnime)
routes.post("/createAnime", animeController.createAnime)

// Rutas de capitulos
routes.get("/getAllChapters/:_id", chapterController.getAllChapters)
routes.post("/createChapter", chapterController.createChapter)
routes.delete("/deleteChapter/:_id", chapterController.deleteChapter)
routes.put("/updateChapter/:_id", chapterController.updateChapter)



module.exports = routes;
