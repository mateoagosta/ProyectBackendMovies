const anime = require("../model/anime");
const Anime = require("../model/anime");
const Chapter = require("../model/chapters");

const createChapter = async (title, description, urlVideo, animeId ) => {
    let result;

    try{

        const animeFound = await anime.findById(animeId); 
        if(!animeFound){
            return {status: 400, message: "El anime no existe", animeId}
        }
        const newChapter = new Chapter({ title, description, urlVideo, animeOwner: animeId });
        await newChapter.save()
        animeFound.chapters.push(newChapter._id); // Usamos la funcion para pushear con el userFound los anime 
        await animeFound.save() //Grabo aca los animes.
        result = {
            status: 201,
            message: "capitulo creado exitosamente",
            newChapter
        }; 
        return result;
        ;    
    }catch(error){
        console.log(error);
        throw error;
    }
            
}
const deleteChapter = async (_id) => {
    try{
        await Chapter.findByIdAndRemove(_id);
        return {data : "anime eliminado"}
    }catch(error){
        throw error;
    }
}

const updateChapter = async (_id, body) => {
    try {
  
        const update = validate(body.title, body.description, body.urlImg, body.category);
  
        const options = { new: true };
  
        const result = await Chapter.findByIdAndUpdate(_id, update, options);
        
        result;
    } catch (error){
        throw error
    }
  }
  
  
  const validate = (title, description, urlImg, category) => {
    const res = {};
  
    if(title){
      res.title = title;
    }
  
    if(description){
      res.description = description;
    }
  
    if(urlImg){
      res.urlImg = urlImg;
    }
  
    return res;
  }

const getAllChapters = async (_id) =>{
    let result;
    let criteria = {};
    try{
        if(_id){
            criteria._id = _id;
        }
        const chapter = await Anime.findById(criteria._id);
        result = {
            status: 200,
            chapter,
        };
        console.log(result)
        return result;
    }catch(error){
        throw error;    
    }
       
}

module.exports = {
    createChapter,
    deleteChapter,
    updateChapter,
    getAllChapters,
}