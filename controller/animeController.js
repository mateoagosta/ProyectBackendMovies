const { animeService } = require("../service")

const createAnime = async (req, res) =>{
    const { title, description, urlImg, category, chapters, userId } = req.body ;

    const result = await animeService.createAnime(title, description, urlImg, category, chapters, userId);
    res.status(201).send(result);
}

module.exports = {
    createAnime,
}