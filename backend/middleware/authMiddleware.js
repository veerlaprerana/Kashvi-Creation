const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

// ✅ Middleware to Check Admin Privileges
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};

module.exports = { verifyToken, isAdmin };
