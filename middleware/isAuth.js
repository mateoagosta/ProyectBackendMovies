const { loginService } = require("../service");

const isAuth = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            return res.status(401).send({message: "Usuario no logueado"});
        }
    //Obtenemos el token 
        const token = req.headers.authorization.split(" ")[1];

    //Usamos el services para decode el token y verificamos 
        const response = await loginService.decodeToken(token);
        req.user = response;
        next();
    }catch(error){
        return res.status(500).send({message: "error al validar el token"});
    };
}

module.exports = isAuth;