const express = require("express");
const { register, login, refreshToken, logout } = require("../controllers/authController");

const router = express.Router();

// ✅ Auth Routes (Only Email & Password)
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;
