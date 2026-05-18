const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { db } = require("../firebase");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios",
      });
    }

    const userRef = db.collection("users");

    const existingUser = await userRef.where("email", "==", email).get();

    if (!existingUser.empty) {
      return res.status(400).json({
        error: "E-mail já cadastrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRef.add({
      name,
      email,
      password: hashedPassword,
      completedChallenges: [],
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      id: newUser.id,
    });
  } catch (error) {
    console.error("ERRO NO REGISTER:", error);

    return res.status(500).json({
      error: "Erro ao cadastrar usuário",
      details: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "E-mail e senha são obrigatórios",
      });
    }

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({
        error: "Usuário não encontrado",
      });
    }

    const doc = snapshot.docs[0];
    const user = doc.data();

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: doc.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user: {
        id: doc.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);

    return res.status(500).json({
      error: "Erro ao fazer login",
      details: error.message,
    });
  }
});

module.exports = router;