const express = require('express');
const router = express.Router();
const Cart = require('../models/Cartb'); // Cart schema
const Order = require('../models/Orders'); // Order schema

// Route to create an order
router.post('/create', async (req, res) => {
    const { mail, cartItems } = req.body;

    if (!mail || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Invalid request data'});
    }

    try {
        // Create a new order
        const newOrder = new Order({
            mail: mail, 
            items: cartItems,
            orderDate: new Date(),
        });

        // Save the new order to the database
        await newOrder.save();

        // ✅ DELETE CART ITEMS FROM BACKEND DATABASE
        const deleteResult = await Cart.deleteMany({ mail: mail });

        console.log(` Deleted ${deleteResult.deletedCount} items from cart for ${mail}`);

        res.status(200).json({
            message: 'Order placed successfully!',
            orderId: newOrder._id,
        });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ message: 'Error placing order. Please try again.' });
    }
});

module.exports = router;
