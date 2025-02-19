const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlist");
const Cart = require("../models/Cartb");

// Move item from wishlist to cart with adjustable quantity
router.post("/:mail/move-to-cart/:productId", async (req, res) => {
  try {
    const { mail, productId } = req.params;
    const { quantity } = req.body; // Get quantity from request body

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    // Find item in wishlist
    const wishlistItem = await Wishlist.findOne({ mail, productId });
    if (!wishlistItem) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    // Check if the item already exists in the cart
    let existingCartItem = await Cart.findOne({ mail, productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity; // Update quantity if exists
      await existingCartItem.save();
    } else {
      // Add item to cart with the specified quantity
      const newCartItem = new Cart({
        mail,
        productId,
        name: wishlistItem.name,
        quantity,
        image: wishlistItem.image,
      });
      await newCartItem.save();
    }

    // Remove item from wishlist
    await Wishlist.findOneAndDelete({ mail, productId });

    res.json({ success: true, message: "Product moved to cart" });
  } catch (error) {
    console.error("❌ Error moving item to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Move all wishlist items to cart with default quantity of 1
router.post("/:mail/move-all-to-cart", async (req, res) => {
  try {
    const { mail } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    // Find all wishlist items for the user
    const wishlistItems = await Wishlist.find({ mail });
    if (wishlistItems.length === 0) {
      return res.status(404).json({ error: "No items in wishlist" });
    }

    for (const item of wishlistItems) {
      let existingCartItem = await Cart.findOne({ mail, productId: item.productId });
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartItem = new Cart({
          mail,
          productId: item.productId,
          name: item.name,
          quantity,
          image: item.image,
        });
        await newCartItem.save();
      }
    }
    
    // Clear wishlist after moving items
    await Wishlist.deleteMany({ mail });

    res.json({ success: true, message: "All products moved to cart" });
  } catch (error) {
    console.error("❌ Error moving all items to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch Wishlist Items for a User
router.get("/:mail", async (req, res) => {
  try {
      const { mail } = req.params;
      const wishlistItems = await Wishlist.find({ mail });
      
      if (!wishlistItems || wishlistItems.length === 0) {
          return res.status(404).json({ error: "Wishlist is empty" });
      }

      res.json({ wishlist: wishlistItems });
  } catch (error) {
      console.error("❌ Error fetching wishlist:", error);
      res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
