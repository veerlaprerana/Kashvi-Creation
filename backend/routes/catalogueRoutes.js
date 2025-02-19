const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/kashviDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ✅ Define Saree Schema & Model (Use relative image paths)
const SareeSchema = new mongoose.Schema({
  name: String,
  image: String, // Store local path, e.g., "/uploads/saree1.jpg"
  color: String,
  style: String
});
const Saree = mongoose.model("Saree", SareeSchema);

// ✅ API to Fetch Sarees
app.get("/api/catalogue", async (req, res) => {
  try {
    const sarees = await Saree.find();
    res.json(sarees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ API to Get a Single Saree by ID
app.get("/api/product/:id", async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) return res.status(404).json({ message: "Product Not Found" });
    res.json(saree);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));