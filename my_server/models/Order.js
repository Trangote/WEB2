const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: { type: String, require: true},
  productID: { type: String, require: true },
  orderID: { type: String, require: true },
  dateRent: { type: String },
  dateEnd: { type: String },
  timeRent: { type: String, require: true },
  productName: { type: String, require: true },
  status: { type: String},
  dateReceive: { type: String, require: true },
  rentFor: { type: String, require: true },
  voucherID: { type: String, require: true },
  depositPrice: { type: String, require: true },
  datePay: { type: String},
  // timePay: { type: String },
  fullName: { type: String, require: true},
  idCard: { type: String, require: true},
  phone: { type: String, require: true },
  email: { type: String, require: true },
  quantity: { type: Number, require: true},
  
});

module.exports = mongoose.model("Order", OrderSchema);
