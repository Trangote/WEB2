const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudioSchema = new Schema({
  productName: { type: String, require: true },
  unitPrice: { type: Number, require: true },
  style: { type: String, require: true },
  album: { type: String, require: true },
  productDescription: { type: String, require: true },
  imgProduct1: { type: String },
  imgProduct2: { type: String },
  imgProduct3: { type: String },
  imgProduct4: { type: String },
  quantity: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Studio", StudioSchema);
