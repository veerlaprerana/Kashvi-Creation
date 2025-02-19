const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
require("dotenv").config();

// ✅ Generate JWT Access Token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Generate Refresh Token
const generateRefreshToken = async (user) => {
    await RefreshToken.deleteMany({ userId: user._id }); // Remove old refresh tokens
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    await RefreshToken.create({ userId: user._id, token: refreshToken });
    return refreshToken;
};

// ✅ Register User
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await argon2.hash(password);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "✅ User registered successfully" });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "User not found" });

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        res.json({
            message: "✅ Login successful",
            accessToken,
            refreshToken,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Refresh Token API
const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: "Refresh token required" });

    try {
        const storedToken = await RefreshToken.findOne({ token });
        if (!storedToken) return res.status(403).json({ error: "Invalid refresh token" });

        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const newAccessToken = generateAccessToken({ _id: decoded.id });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("❌ Refresh token error:", error);
        res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};

// ✅ Logout
const logout = async (req, res) => {
    const { token } = req.body;
    await RefreshToken.deleteOne({ token });
    res.json({ message: "✅ Logged out successfully" });
};

module.exports = {
    register,
    login,
    refreshToken,
    logout
};
