const mongoose = require("mongoose");

// ✅ Define Schema
const SareeSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, // 🔹 Ensure unique productId
  name: { type: String, required: true },
  color: { type: String, required: true },
  style: { type: String, required: true }, // 🔹 Fixed "Style" to "style"
  image: { type: String }, // 🔹 Store Cloudinary URL
}, { collection: "products" }); // ✅ Force Mongoose to use "products" collection

// ✅ Create Model
const Saree = mongoose.model("Saree", SareeSchema);
module.exports = Saree;