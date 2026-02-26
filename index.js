const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.log("MongoDB error:", err.message));
} else {
  console.log("MONGO_URL not defined. Running without MongoDB.");
}

/* =========================
   User Schema + Model
========================= */

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

/* =========================
   Routes
========================= */

// Test route
app.get("/", (req, res) => {
  res.send("Railway backend is running 🚀");
});

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create user (optionnel mais utile pour tester)
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
