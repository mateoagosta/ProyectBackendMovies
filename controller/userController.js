const { error } = require("console");
const { resolveSoa } = require("dns");
const loginService = require("../service");
const User = require("../model/user");

const login = (req, res) => {
    const { email } = req.body;

    if(!email){
        return res.status(400).send({ message: "El campo email es requerido" })
    }

    User.findOne({ email }, (error, user) => {
        if(error){
            res.status(500).send({ message: `Se produjo un error`, error })
        }
        if(!user){ //TODO
            return res.status(404).status({ message: "No se encontro el email ingresado"})
        }
        if(!password && user.comparePassword(password)){
            return res.status(401).send({ message: "Usuario o clave incorrectas"})
        }

        res.status(200).send({ message: "Usuario logueado correctamente", token: loginService.createToken(user) })
    })
}

const register = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (error, user) => {
        if(error){
            res.status(500).send({ message: `Se produjo un error`, error })
        }
        if(user){ //TODO
            return res.status(404).status({ message: "No se encontro el email ingresado"})
        }

        const newUser = new User({ email, password });
        newUser.save((error) =>{
            if(error){
                return res.status(500).send({ message: "error al registrar el usuario", error})
            }
        })
        res.status(200).send({ message: "Usuario logueado correctamente", token: loginService.createToken(user)})
    })
}

const test = (req, res) => {
    res.status(200).send(`Bienvenido usuario con el id${req?.user?._id}`)
}

module.exports = {
    login,
    register,
    test
}