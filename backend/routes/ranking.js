const express = require("express");

const { db } = require("../firebase");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const challengePoints = {
  1: 50,
  2: 30,
  3: 80,
  4: 90,
};

function calculateScore(completed) {
  return completed.reduce((total, id) => {
    return total + (challengePoints[id] || 0);
  }, 0);
}

router.get("/", authMiddleware, async (req, res) => {
  const snapshot = await db.collection("users").get();

  const ranking = [];

  snapshot.forEach((doc) => {
    const user = doc.data();

    ranking.push({
      id: doc.id,
      name: user.name,
      score: calculateScore(
        user.completedChallenges || []
      ),
    });
  });

  ranking.sort((a, b) => b.score - a.score);

  const formatted = ranking.map((user, index) => ({
    ...user,
    position: index + 1,
    medal:
      index === 0
        ? "🥇"
        : index === 1
        ? "🥈"
        : index === 2
        ? "🥉"
        : "",
  }));

  const currentUser = formatted.find(
    (u) => u.id === req.user.id
  );

  res.json({
    ranking: formatted.slice(0, 50),
    currentUser,
  });
});

module.exports = router;