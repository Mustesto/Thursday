const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB (optionnelle, si MONGO_URL défini)
if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connecté ✅"))
    .catch(err => console.log("Erreur MongoDB:", err.message));
} else {
  console.log("MONGO_URL non défini, MongoDB non connecté");
}

// Route test simple
app.get("/", (req, res) => {
  res.send("API fonctionne 🚀");
});

// Port Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
