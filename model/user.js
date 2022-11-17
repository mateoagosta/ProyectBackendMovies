const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Armamos el esquema de mongo de la creacion de usuario y relacionamos con los animes con anime
const UserSchema = new Schema({
    email : { type: String, unique: true, lowercase: true, required: true },
    password : { type: String, required: true },
    registerDate : { type: Date, default: Date.now() },
    anime: [{ type: Schema.Types.ObjectId, ref: "Anime"}]
});

UserSchema.pre("save", (next) => {
    let user = this;

    // if(!user.isModified("password")){
    //     return next();
    // }

    bcrypt.genSalt(10, (error, salt) => {
        if(error){
            return next(error);
        }
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            user.password = hash;
            next();
        })
    })
});

UserSchema.method.comparePassword = (password) => {
    let user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model("User", UserSchema);