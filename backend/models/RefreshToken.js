const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: "7d" } // ✅ Auto-delete after 7 days
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
