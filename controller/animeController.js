const anime = require("../model/anime");
const { animeService } = require("../service");

const createAnime = async (req, res) =>{
    try {
        const { title, description, urlImg, category, chapters } = req.body ;

        const result = await animeService.createAnime(title, description, urlImg, category, chapters);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al crear el anime")
    }
    
}

const deleteAnime = async (req, res) => {
    try {
        const { _id } = req.params ;
        const result = await animeService.deleteAnime(_id);
        res.status(201).send(result.data);

    } catch (error) {
        res.status(404).send("No se pudo eliminar el Anime ya que no se encuentra en la base de datos");
    }
}

const updateAnime = (req, res) =>{
    try {
        const { _id } = req.params ;

        const result = animeService.updateAnime(_id, req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al editar el anime")
    }
}

const getOneAnime = async (req, res) =>{
    try {
        const { _id } = req.params ;

        const result = await animeService.getOneAnime(_id);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al mostrar el anime")
    }   
}

const getAllAnimes = async (req, res) =>{
    try {
        const { category } = req.body ;

        const result = await animeService.getAllAnimes(category);
        res.status(201).send(result);
    }catch(error) {
        res.status(500).send("Se produjo un error al mostrar los animes")
    }   
}



module.exports = {
    createAnime,
    deleteAnime,
    updateAnime,
    getOneAnime,
    getAllAnimes

}