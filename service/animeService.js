const Anime = require("../model/anime");
const User = require("../model/user");

const createAnime = async (title, description, urlImg, category, chapters, userId) => {

    let result;

    try{
        const userFound = await User.findById(userId);
        if(!userFound){
            return;
        }
        const newAnime = new Anime({title, description, urlImg, category, chapters, userId})
        await newAnime.save();

        userFound.anime.push(newAnime._id); // Usamos la funcion para pushear con el userFound los anime 
        await userFound.save() //Grabo aca los animes.
        
    }catch(error){
        console.log(error);
        throw error;
    }
    return result;         
        
}

module.exports = {
    createAnime,
}