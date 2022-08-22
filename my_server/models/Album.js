const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    imgalbum: { type: String, required: true },
    imgalbum1: { type: String, required: true },
    imgalbum2: { type: String, required: true },
    imgalbum3: { type: String, required: true },
    imgalbum4: { type: String, required: true },
    imgalbum5: { type: String, required: true },
    imgalbum6: { type: String, required: true },
    imgalbum7: { type: String},
    imgalbum8: { type: String },
    imgalbum9: { type: String},
    imgalbum10: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Album", AlbumSchema);
