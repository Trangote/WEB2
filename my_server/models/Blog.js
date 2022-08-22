const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    imgblog: { type: String, required: true },
    imgblog1: { type: String, required: true },
    blogTitle: { type: String, required: true },
    blogType: { type: String, required: true },
    blogText: { type: String, required: true },
    blogDescription: { type: String, required: true },
    adminName: { type: String, required: true },
    timeUpload: { type: String, required: true },
    blogView: { type: String, required: true },
    blogComment: { type: String, required: true },
    blogTym: { type: String, required: true },
});

module.exports = mongoose.model("Blog", BlogSchema);
