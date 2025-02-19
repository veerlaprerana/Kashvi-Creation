const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cartb"); // Ensure you have the Cart model
const Wishlist = require("../models/Wishlist"); // Ensure you have the Wishlist model

// ✅ Fetch all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("❌ Error fetching products:", err);
        res.status(500).json({ error: "Error fetching products", details: err.message });
    }
});

// ✅ Fetch a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        console.error("❌ Error fetching product:", err);
        res.status(500).json({ error: "Error fetching product", details: err.message });
    }
});

// ✅ Add Product to Cart
router.post("/:id/add-to-cart", async (req, res) => {
    try {
        console.log("🔹 Received add-to-cart request:", req.body);
        
        const { mail, quantity } = req.body;
        const productId = req.params.id;

        if (!mail || !quantity) {
            return res.status(400).json({ error: "Missing required fields (mail, quantity)" });
        }

        const qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ error: "Invalid quantity value" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        let existingCartItem = await Cart.findOne({ mail, productId });

        if (existingCartItem) {
            existingCartItem.quantity += qty;
            await existingCartItem.save();
            return res.json({ success: true, message: "Product quantity updated", cart: existingCartItem });
        }

        const newCartItem = new Cart({
            mail,
            productId,
            name: product.name,
            quantity: qty,
            image: product.image
        });

        await newCartItem.save();
        res.json({ success: true, message: "Product added to cart", cart: newCartItem });
    } catch (error) {
        console.error("❌ Error adding to cart:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Add Product to Wishlist
router.post("/:id/add-to-wishlist", async (req, res) => {
    try {
        console.log("🔹 Received add-to-wishlist request:", req.body);
        
        const { mail } = req.body;
        const productId = req.params.id;

        if (!mail) {
            return res.status(400).json({ error: "Missing required field (mail)" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        let existingWishlistItem = await Wishlist.findOne({ mail, productId });

        if (existingWishlistItem) {
            return res.json({ success: true, message: "Product already in wishlist", wishlist: existingWishlistItem });
        }

        const newWishlistItem = new Wishlist({
            mail,
            productId,
            name: product.name,
            image: product.image
        });

        await newWishlistItem.save();
        res.json({ success: true, message: "Product added to wishlist", wishlist: newWishlistItem });
    } catch (error) {
        console.error("❌ Error adding to wishlist:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
    try {
        const { name, description, images, price, stock, category, tags } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ error: "Missing required fields (name, price, stock)" });
        }

        const newProduct = new Product({ name, description, images, price, stock, category, tags });
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("❌ Error saving product:", err);
        res.status(400).json({ error: "Error saving product", details: err.message });
    }
});

// ✅ Update a product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

        res.json(updatedProduct);
    } catch (err) {
        console.error("❌ Error updating product:", err);
        res.status(400).json({ error: "Error updating product", details: err.message });
    }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

        res.json({ success: true, message: "✅ Product deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting product:", err);
        res.status(500).json({ error: "Error deleting product", details: err.message });
    }
});

module.exports = router;
