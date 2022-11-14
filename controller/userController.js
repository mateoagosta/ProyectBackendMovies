const { userService } = require("../service");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
    try {
    const { email, password } = req.body;
    const resultValidationReq = validationResult(req);
    const hasErrors = !resultValidationReq.isEmpty();

  if(hasErrors){
    console.log("HAY ERRORES!")
    console.log(resultValidationReq)
    return res.status(400).send(resultValidationReq);
  }
    
    const result = await userService.register(email, password);
    res.status(200).send(result)
        
    } catch (error) {
        res.status(500).send(error);
    }
     
}

const login = (req, res) => {
    const { email } = req.body;

    if(!email){
        return res.status(403).send({ message: "El campo email es requerido" })
    }

    User.findOne({ email }, (error, user) => {
        if(error){
            res.status(500).send({ message: `Se produjo un error al loguear el usuario`, error })
        }
        if(!user || !req.body.password || !user.comparePassword(req.body.password)){ 
            return res.status(404).send({ message: "usuario no existente o clave incorrecta"})
        }
        
        req.user = user;
        res.status(200).send({ message: "Usuario logueado correctamente", token: loginService.createToken(user) })
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