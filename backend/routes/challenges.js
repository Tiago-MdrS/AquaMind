const express = require("express");

const { db } = require("../firebase");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const challenges = [
  {
    id: 1,
    title: "Tomar banho em menos de 5 minutos",
    points: 50,
  },
  {
    id: 2,
    title: "Fechar a torneira ao escovar os dentes",
    points: 30,
  },
  {
    id: 3,
    title: "Reutilizar água da chuva",
    points: 80,
  },
  {
    id: 4,
    title: "Não usar mangueira para limpar calçadas",
    points: 90,
  },
];

router.get("/", authMiddleware, async (req, res) => {
  const userDoc = await db
    .collection("users")
    .doc(req.user.id)
    .get();

  const user = userDoc.data();

  const data = challenges.map((challenge) => ({
    ...challenge,
    completed:
      user.completedChallenges.includes(challenge.id),
  }));

  res.json(data);
});

router.post("/:id/complete", authMiddleware, async (req, res) => {
  const challengeId = Number(req.params.id);

  const userRef = db.collection("users").doc(req.user.id);

  const userDoc = await userRef.get();

  const user = userDoc.data();

  if (
    user.completedChallenges.includes(challengeId)
  ) {
    return res.status(400).json({
      error: "Desafio já concluído",
    });
  }

  const updatedChallenges = [
    ...user.completedChallenges,
    challengeId,
  ];

  await userRef.update({
    completedChallenges: updatedChallenges,
  });

  res.json({
    message: "Desafio concluído",
  });
});

module.exports = router;