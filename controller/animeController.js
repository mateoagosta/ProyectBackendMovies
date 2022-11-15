const { animeService } = require("../service");

const createAnime = async (req, res) =>{
    try {
        const { title, description, urlImg, category, chapters, userId } = req.body ;

        const result = await animeService.createAnime(title, description, urlImg, category, chapters, userId);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al crear el anime")
    }
    
}

module.exports = {
    createAnime,
}