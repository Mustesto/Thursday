const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (optional)
if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.log("MongoDB error:", err.message));
} else {
  console.log("MONGO_URL not defined. Running without MongoDB.");
}

// Test route
app.get("/", (req, res) => {
  res.send("Railway backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
