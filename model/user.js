const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const { error } = require("console");

const UserSchema = new Schema({
    email : { type: String, unique: true, lowercase: true },
    password : { type: String, required: true },
    registerDate : { type: Date, default: Date.now() }
});

UserSchema.pre("save", (next) => {
    let user = this;

    bcrypt.genSalt(10, (error, salt) => {
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