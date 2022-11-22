const Anime = require("../model/anime");
const User = require("../model/user");

const createAnime = async (title, description, urlImg, category, chapters) => {

    let result;

    try{
        // const userFound = await User.findById(userId); //usamos el userId para relacionar anime-user
        // if(userFound){
        //     console.log(!userFound)
        //     return { status: 400, message: "El usuario no existe", id: userId}

        // Falta poner condicionales porque te crea el anime de una y puede haber 2 iguales con mismo nombre
        // pero tendran diferente id
        const newAnime = new Anime({title, description, urlImg, category, chapters})
        await newAnime.save();

        // const userFound = userFound.anime.push(newAnime._id); // Usamos la funcion para pushear con el userFound los anime 
        // await userFound.save() //Grabo aca los animes.
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
    // return new Promise((resolve, reject) => {
    //     Anime.findByIdAndRemove(_id, (err, result) => {
    //         if(err){
    //             reject(err);
    //         } else if (!result){
    //             reject("El id ingresado no existe.");
    //         }
    //         resolve(result);
    //     });
    // });
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
            category: body.category
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