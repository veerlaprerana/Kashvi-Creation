const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model("Order", orderSchema, "orders");