const express = require("express");
const router = express.Router();
const Saree = require("../models/Saree");

// ✅ Fetch All Sarees (With Filters)
router.get("/catalogue", async (req, res) => {
  try {
    let filter = {};
    if (req.query.color) filter.color = req.query.color;
    if (req.query.style) filter.style = req.query.style;

    const sarees = await Saree.find(filter);
    res.json(sarees);
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error });
  }
});

// ✅ Fetch a Specific Saree by productId
router.get("/:productId", async (req, res) => {
  try {
    const saree = await Saree.findOne({ productId: req.params.productId });
    if (!saree) {
      return res.status(404).json({ message: "❌ Saree not found" });
    }
    res.json(saree);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching saree", error });
  }
});

module.exports = router;
