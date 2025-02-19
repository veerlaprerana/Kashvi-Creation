const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  mail: { type: String, required: true }, // Changed from userId to mail
  productId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model("Cart", cartSchema, "cart");