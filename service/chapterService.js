const Anime = require("../model/anime");
const chapters = require("../model/chapters");
const Chapter = require("../model/chapters");

const createChapter = async (title, description, urlVideo, animeId ) => {

    let result;

    try{

        const animeFound = await Anime.findById(animeId); 
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
        }; return result;    
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
  
  
        const update = validate(body.title,body.description,body.urlImg,body.category);
  
        const options = { new: true };
  
        const result = await chapters.findByIdAndUpdate(_id, update, options);
        
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
  
    if(category){
      res.category = category;
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
        const chapters = await chapters.findById(criteria._id);
        result = {
            status: 200,
            chapters,
        };
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