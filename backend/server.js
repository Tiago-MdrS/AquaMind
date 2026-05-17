const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const challengeRoutes = require("./routes/challenges");
const rankingRoutes = require("./routes/ranking");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/ranking", rankingRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend AquaMind rodando" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});