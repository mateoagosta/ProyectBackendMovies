const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Armamos el Schema de los animes y lo relacionamos con los users con el userOwner
const AnimeSchema = new Schema({
    title: { type: String, lowercase: true, required: true },
    description: { type: String, lowercase: true, required: true },
    urlImg: { type: String, required: true },
    category: { type: String, lowercase: true, required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapters"}],
    userOwner: { type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Anime", AnimeSchema);