const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: { type: String, require: true },
  userAvatar: { 
    img: {type: String},
    createdAt: { type: String },
   },
  gender: { type: String, require: true },
  dateOfBirth: { type: String, require: true },
  notifications: {
    title: { type: String },
    body: { type: String },
    createdAt: { type: String },
  },
  userName: { type: String, require: true },
  idCard: { type: String, require: true },
  userPoint: { type: Number, default: 5 },
  password: { type: String, require: true },
  confirmPass: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  fullName: { type: String, require: true },
  typeUser: { type: String, default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
