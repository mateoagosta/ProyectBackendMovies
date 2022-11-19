const { userService } = require("../service");
const { validationResult } = require("express-validator");
const User = require("../model/user");

const register = async (req, res) => {
    try {
    const { email, password } = req.body;
    const resultValidationReq = validationResult(req);
    const hasErrors = !resultValidationReq.isEmpty();

  if(hasErrors){
    console.log("Se produjeron errores en la validacion")
    console.log(resultValidationReq)
    return res.status(400).send(resultValidationReq);
  }
    
    const result = await userService.register(email, password);
    res.status(200).send(result)
        
    } catch (error) {
        res.status(500).send(error);
    }
     
}

const login = async (req, res) => {
    const { email, password } = req.body;
 
    const resultValidation = validationResult(req);
    const hasErrors = !resultValidation.isEmpty();
 
    if(hasErrors){
     return res.status(400).send(resultValidation);
    }
 
    const result = await userService.login(email, password).catch(error => error);
    return res.status(result.status).send(result);
 }

const test = (req, res) => {
    res.status(200).send(`Bienvenido usuario con el id${req?.user?._id}`)
}

module.exports = {
    login,
    register,
    test
}