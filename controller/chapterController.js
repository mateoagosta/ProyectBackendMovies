const { chapterService } = require("../service");
const chapters = require("../model/chapters");

const getAllChapters = async (req, res) => {
    try {
        const { _id } = req.params ;
        
        const result = await chapterService.getAllChapters(_id);
        console.log(result);
        res.status(201).send(result.chapter);
    }catch(error) {
        res.status(500).send("Se produjo un error al mostrar los capitulos")
    }
}

const createChapter = async (req, res) => {
    try{
        const { title, description, urlVideo, animeId } = req.body;
        const result = await chapterService.createChapter(title, description, urlVideo, animeId);
        res.status(result.status).send(result);
    }catch(error){
        res.status(500).send("Se produjo un error al crear el capitulo para el anime correspondiente.");
    }
}

const deleteChapter = async (req, res) => {
    try {
        const { _id } = req.params ;
        const result = await chapterService.deleteChapter(_id);
        res.status(201).send(result.data);

    } catch (error) {
        res.status(404).send("No se pudo eliminar el Anime ya que no se encuentra en la base de datos");
    }
}

const updateChapter = (req, res) => {
    try {
        const { _id } = req.params ;

        const result = chapterService.updateChapter(_id, req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Se produjo un error al actualizar este capitulo")
    }
}

module.exports = {
    getAllChapters,
    createChapter,
    deleteChapter,
    updateChapter
}






