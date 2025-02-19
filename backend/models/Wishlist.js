const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, default: 1 }
});

// Prevent model overwriting issue
const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
