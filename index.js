const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB (Railway utilise variable d'environnement)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Route test simple
app.get("/", (req, res) => {
  res.send("API fonctionne 🚀");
});

// Port Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
