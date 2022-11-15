const User = require("../model/user");
const loginService = require("./loginService");


const register = (email, password) => {
    // Creamos una promesa 
    return new Promise((resolve, reject) => {
        const newUser = new User({
            email,
            password,
        });

        User.findOne({email: newUser.email}, (error, user) => {
            if(error){
                reject({status: 500, messsage: `Error al registrar el nuevo usuario ${error}`})
            }
            if(user){
                reject({status: 403, messsage:'El email ingresado ya se encuentra en uso.'})
            }
            newUser.save(error => {
            if(error){
                reject({status: 500, messsage:`Se produjo un error al registrar el nuevo usuario. ${error}`})
            }
            resolve({status: 200, token: loginService.createToken(newUser)})
            });
        }); 
    });
    
}

const login = (email, password) => { // REVISAR
    return new Promise((resolve, reject) => {
        User.findOne({ email }, (error, user) => {
            if(error){
                reject({ status: 500, message: 'Se produjo un error al registrar el usuario.', error });
            }
            if(!user || !password || !user.comparePassword(password)){
                reject({ status: 401, message: 'El usuario o clave no son correctos.', error });
            }
            resolve({ status: 200,  message: 'Te has logueado correctamente', token: authService.createToken() });
        });
    })
}

module.exports = {
    register,
    login,
}