const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

// Usamos el middleware para utilizar el request del body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Accedemos al .env del dotenv
dotenv.config();

// Generamos la extension para las rutas
app.use("/api", routes)

// Conectamos el sv con mongo
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, (error, response) => {
    if(error){
        return console.log(`Error al conectar con la base de datos ${error}`);
    }
    console.log("Conexion a la base de datos establecida");
        // Levantamos el server
    app.listen(process.env.PORT, (error) => {
        if(error){
            console.log(`Error al levantar el servidor ${error}`);
        }
        console.log(`Conexion al puerto ${process.env.PORT} establecido`)
        })
    
})