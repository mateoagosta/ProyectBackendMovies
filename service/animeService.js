const Anime = require("../model/anime");
const User = require("../model/user");

const createAnime = async (title, description, urlImg, category, chapters, userId) => {

    let result;

    try{
        const userFound = await User.findById(userId); //usamos el userId para relacionar anime-user
        if(!userFound){
            return;
        }
        const newAnime = new Anime({title, description, urlImg, category, chapters, userOwner: userId})
        await newAnime.save();

        userFound.anime.push(newAnime._id); // Usamos la funcion para pushear con el userFound los anime 
        await userFound.save() //Grabo aca los animes.
        
    }catch(error){
        console.log(error);
        throw error;
    }
    return result;         
        
}

const deleteAnime = async () => {
    const { userId } = req.params; // Esta bien el userId o es userOwner : userId ??

     const newData = db.find((el) => el.userId === userId);

    if (newData) {
    let deleteById = db.filter((el) => el.userId != userId);
    return res.status(200).send({ deleteById });
    } else
    res.status(404).send({message:"El usuario que intenta eliminar no existe en la base de datos"});
}

module.exports = {
    createAnime,
    deleteAnime,
}