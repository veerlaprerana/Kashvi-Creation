require("dotenv").config({ path: "./.env" }); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

require("./config/passport"); // Load Passport strategies

const app = express(); // Initialize Express app

// Debugging logs for critical environment variables
console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "MISSING ❌");
console.log("🔑 REFRESH_SECRET:", process.env.REFRESH_SECRET ? "Loaded ✅" : "MISSING ❌");
console.log("🔍 MongoDB URI:", process.env.MONGO_URI ? "Loaded ✅" : "MISSING ❌");

// Exit if critical environment variables are missing
if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET || !process.env.MONGO_URI) {
  console.error("❌ Missing required environment variables. Exiting...");
  process.exit(1);
}

// Middleware Setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(fileupload({ useTempFiles: true, tempFileDir: "./tmp/" })); // Fixed file upload temp dir

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Models
const Saree = require("./models/Saree");
const Cart = require("./models/Cartb");
const Order = require("./models/Orders");
const Wishlist = require("./models/Wishlist");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const catalogueRoutes = require("./routes/catalogueRoutes");
const productRoutes = require("./routes/productRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/catalogue", catalogueRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ✅ Upload Image and Update Saree Document
app.post("/upload-image/:id", async (req, res) => {
  try {
    console.log("🔹 Received request for product ID:", req.params.id);

    const productId = req.params.id.trim();
    if (!req.files || !req.files.image) {
      console.log("❌ No image file uploaded!");
      return res.status(400).json({ error: "❌ No image file uploaded" });
    }

    const file = req.files.image;
    console.log("🔹 Uploading file:", file.name);

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "sarees",
    });

    console.log("✅ Cloudinary Upload Success:", result.secure_url);

    // ✅ Update MongoDB to Store Cloudinary Image URL
    const updatedSaree = await Saree.findOneAndUpdate(
      { productId }, // Ensure productId is used instead of _id
      { $set: { image: result.secure_url } }, // Use $set to force update
      { new: true }
    );

    if (!updatedSaree) {
      console.log("❌ Saree not found in database!");
      return res.status(404).json({ error: "❌ Saree not found" });
    }

    console.log("✅ MongoDB Updated Successfully:", updatedSaree);

    res.json({ message: "✅ Image uploaded successfully", saree: updatedSaree });

  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "❌ Error uploading image" });
  }
});

// ✅ Proceed with Order and Transfer Cart Items to Order
app.post("/:userId/proceed", async (req, res) => {
  const { userId } = req.params;
  try {
    const userCart = await Cart.find({ userId });
    if (userCart.length === 0) {
      return res.status(400).json({ error: "❌ No items in cart to proceed" });
    }
    
    // ✅ Create a New Order
    const newOrder = new Order({
      userId,
      items: userCart.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
      })),
    });

    await newOrder.save();
    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "✅ Order placed successfully", order: newOrder });

  } catch (error) {
    console.error("❌ Error proceeding to buy:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ✅ Serve Static Files from Frontend
app.use(express.static(path.join(__dirname, "frontend", "app", "build")));
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "app", "build", "index.html"));
});
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is running with MongoDB Atlas!" });
});

// ✅ Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({ error: "❌ Route not found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "❌ Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server startup error:", err.message);
  process.exit(1);
});
