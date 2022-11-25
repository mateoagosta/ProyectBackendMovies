const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Armamos el Schema de los animes y lo relacionamos con los users con el userOwner
const AnimeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    urlImg: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapters"}],
    userOwner: { type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Anime", AnimeSchema);