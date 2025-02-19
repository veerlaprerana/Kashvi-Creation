const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }] // Optional tags for better search
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
