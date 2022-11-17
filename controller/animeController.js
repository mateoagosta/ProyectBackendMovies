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

const deleteAnime = async (req, res) => {
    try {
        const { title, description, urlImg, category, chapters, userId } = req.body ;

        const result = await animeService.deleteAnime(title, description, urlImg, category, chapters, userId);
        res.status(201).send(result);
        
    } catch (error) {
        res.status(404).send("No se pudo eliminar el Anime ya que no se encuentra en la base de datos");
    }
}

const updateAnime = async (req, res) =>{
    try {
        const { title, description, urlImg, category, chapters } = req.body ;

        const result = await animeService.updateAnime(title, description, urlImg, category, chapters);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al editar el anime")
    }   
}

const getOneAnime = async (req, res) =>{
    try {
        const { title, description, urlImg, category, chapters } = req.body ;

        const result = await animeService.getOneAnime(title, description, urlImg, category, chapters);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al mostrar el anime")
    }   
}

const getAllAnimes = async (req, res) =>{
    try {
        const { title, description, urlImg, category } = req.body ;

        const result = await animeService.getAllAnimes(title, description, urlImg, category);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al mostrar el anime")
    }   
}



module.exports = {
    createAnime,
    deleteAnime,
    updateAnime,
    getOneAnime,
    getAllAnimes

}