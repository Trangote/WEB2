const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KhuyenMaiSchema = new Schema({
    voucherID: { type: String, required: true },
    voucherPrice: { type: String, required: true },
    expiry: { type: String, required: true },
    voucherPoint: { type: String, required: true },
    voucherCondition: { type: String, required: true },
});

module.exports = mongoose.model("KhuyenMai", KhuyenMaiSchema);
