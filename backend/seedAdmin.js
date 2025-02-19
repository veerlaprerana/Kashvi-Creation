require("dotenv").config({ path: ".env.admin" });  // Load environment variables from .env.admin

const mongoose = require("mongoose");
const User = require("./models/User");
const argon2 = require("argon2");

async function createAdmin() {
    try {
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(process.env.ADMIN_PASSWORD); // Use the password from .env.admin

        // Create an admin user
        const adminUser = new User({
            name: "Admin User",
            email: "admin@example.com",  // You can update this email as needed
            password: hashedPassword,
            role: "admin"  // Set the user's role to "admin"
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log("Admin user created successfully!");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        // Close the DB connection after seeding
        mongoose.connection.close();
    }
}

// MongoDB connection string from the environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log("Connected to MongoDB successfully!");
      createAdmin();  // Call the function to create the admin user
  })
  .catch(err => {
      console.error("Error connecting to MongoDB:", err);
  });
