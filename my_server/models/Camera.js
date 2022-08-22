const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CameraSchema = new Schema({
  productName: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  origin: { type: String, required: true },
  model: { type: String, required: true },
  imgProduct1: { type: String },
  imgProduct2: { type: String },
  imgProduct3: { type: String },
  imgProduct4: { type: String },
  productDescription: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Camera", CameraSchema);
