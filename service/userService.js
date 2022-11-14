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

const login = () => {
    
}

module.exports = {
    register,
    login,
}