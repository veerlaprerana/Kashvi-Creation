const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
