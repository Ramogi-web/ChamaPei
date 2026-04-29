// here we have the ai saving tips
const express = require("express");
const router = express.Router();

router.post("/tips", (req, res) => {
  const { balance, transactions } = req.body;

  // Simple “AI-like” logic (no external API needed)
  let tips = [];

  if (balance < 1000) {
    tips.push("Your balance is low. Reduce non-essential spending.");
  }

  if (transactions?.length > 5) {
    tips.push("You have many transactions. Track small expenses carefully.");
  }

  tips.push("Try saving at least 10% of every M-PESA receipt.");
  tips.push("Group contributions work best when automated weekly.");

  res.json({ tips });
});

module.exports = router;