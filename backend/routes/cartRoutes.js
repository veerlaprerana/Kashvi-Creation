const express = require("express");
const router = express.Router();
const Cart = require("../models/Cartb"); // Ensure correct path to model

// Get cart items for a user (by email)
router.get("/:mail", async (req, res) => {
  try {
    const mail = req.params.mail.trim();
    console.log("Received email:", mail);

    const userCart = await Cart.find({ mail }).select("productId name quantity image");
    console.log("MongoDB Query Result:", userCart);

    if (!userCart.length) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }

    res.json({ success: true, cart: userCart });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update product quantity in the cart
router.put("/:mail/update", async (req, res) => {
  const { mail } = req.params;
  const { productId, quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const updatedCartItem = await Cart.findOneAndUpdate(
      { mail, productId },
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    const updatedCart = await Cart.find({ mail });
    res.json({ success: true, updatedCart });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { mail, productId, name, quantity, image } = req.body;

    if (!mail || !productId || !name || quantity === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let existingCartItem = await Cart.findOne({ mail, productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json({ success: true, message: "Product quantity updated", cart: existingCartItem });
    }

    const newCartItem = new Cart({ mail, productId, name, quantity, image });
    await newCartItem.save();
    res.json({ success: true, message: "Product added to cart", cart: newCartItem });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a product from cart
router.delete("/:mail/remove/:productId", async (req, res) => {
  const { mail, productId } = req.params;

  try {
    const deletedItem = await Cart.findOneAndDelete({ mail, productId });
    if (!deletedItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Error deleting cart item:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
