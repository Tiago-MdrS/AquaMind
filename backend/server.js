const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const challengeRoutes = require("./routes/challenges");
const rankingRoutes = require("./routes/ranking");

const app = express();

/* CORS */
app.use(cors());

/* JSON */
app.use(express.json());

/* ROTAS */
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/ranking", rankingRoutes);

/* TESTE */
app.get("/", (req, res) => {
  res.json({
    message: "Backend AquaMind rodando",
  });
});

/* PORTA */
const PORT = process.env.PORT || 3333;

/* LOCAL */
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

/* VERCEL */
module.exports = app;