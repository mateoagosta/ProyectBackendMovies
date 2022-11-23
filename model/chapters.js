const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Armamos el Schema de los animes y lo relacionamos con los users con el userOwner
const ChaptersSchema = new Schema({
    title: { type: String, lowercase: true, required: true },
    description: { type: String, lowercase: true, required: true },
    urlVideo: { type: String, required: true, unique: true },
    animeOwner: { type: Schema.Types.ObjectId, ref: "Anime"}
});

module.exports = mongoose.model("Chapters", ChaptersSchema);