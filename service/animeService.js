const Anime = require("../model/anime");
const User = require("../model/user");

const createAnime = async (title, description, urlImg, category, chapters) => {
    let result;
    try{
        const newAnime = new Anime({title, description, urlImg, category, chapters})
        await newAnime.save();
        result = {
            status: 201,
            message: "anime creado exitosamente",
            newAnime
        }
        
    }catch(error){
        console.log(error);
        throw error;
    }
    return result;         
}
const deleteAnime = async (_id) => {
    try{
         await Anime.findByIdAndRemove(_id);
        // res.status(200).send("Anime eliminado correctamente")
        return {data : "anime eliminado"}
    }catch(error){
        // res.status(404).send(error);
        throw error;
    }
}

const updateAnime = async (_id, body) => {
    try {
        const update = {
            title: body.title,
            description: body.description,
            urlImg: body.urlImg,
            // category: body.category
        }
        const options = { new: true };

        const result = await Anime.findByIdAndUpdate(_id, update, options);
        result.save();
        result;
    } catch (error){
        throw error
    }
}

const getOneAnime = async (_id) =>{
    
    let result;
    let criteria = {};
    try{
        if(_id){
            criteria._id = _id;
        }
        const animes = await Anime.findOne(criteria);
        result = {
            status: 200,
            animes,
        }
    }catch(error){
        throw error;
    }
    return result;   
}

const getAllAnimes = async (category) =>{
    let result;
    let criteria = {};
    try{
        if(category){
            criteria.category = category;
        }
        const animes = await Anime.find(criteria);
        result = {
            status: 200,
            animes,
        }
    }catch(error){
        throw error;
    }
    return result;  
}


module.exports = {
    createAnime,
    deleteAnime,
    updateAnime,
    getAllAnimes,
    getOneAnime
}