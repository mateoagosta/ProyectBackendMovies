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

// const deleteAnime = async () => {
//     const { userId } = req.params; // Esta bien el userId o es userOwner : userId ??

//      const newData = db.find((el) => el.userId === userId);

//     if (newData) {
//     let deleteById = db.filter((el) => el.userId != userId);
//     return res.status(200).send({ deleteById });
//     } else
//     res.status(404).send({message:"El usuario que intenta eliminar no existe en la base de datos"});
// }

const updateAnime= (id, name, value) => {
    return new Promise((resolve, reject) => {
        Anime.findByIdAndUpdate({ _id: id }, { name, value }, (err, result) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    });
}

const deleteAnime = (id) => {
    return new Promise((resolve, reject) => {
        Anime.findByIdAndRemove(id, (err, result) => {
            if(err){
                reject(err);
            } else if (!result){
                reject("El id ingresado no existe.");
            }
            resolve(result);
        });
    });
}

const getOneAnime = async (req, res) =>{
    const { title, description, urlImg, category, chapters } = req.body ;
    let result;
    let criteria = {};
    try{
        if(body){
            criteria.body = body;
        }
        const animes = await Animes.find(criteria);
        result = {
            status: 200,
            animes,
        }
    }catch(error){
        throw error;
    }
    return result;   
}

const getAllAnimes = async (req, res) =>{

    const { title, description, urlImg, category } = req.body ;
    let result;
    let criteria = {};
    try{
        if(body){
            criteria.body = body;
        }
        const animes = await Animes.find(criteria);
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