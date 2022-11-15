const { check } = require('express-validator');

// Esquema de validaciones con express validator
module.exports = [
    check('email').exists()
        .notEmpty()
        .withMessage('El email es un campo requerido.')
        .custom((value, { req }) => value.includes("@") && value.includes(".com"))
        .withMessage('El email ingresado no es valido'),
    
    check('password')
        .exists().withMessage('Password es un campo requerido requerido.')
        .notEmpty().withMessage('la contraseña no puede estar vacia.')
        
];
