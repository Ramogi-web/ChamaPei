// below is an transaction api route

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const parseSMS = require("../utils/parser");

// POST transaction (paste SMS)
router.post("/", (req, res) => {
  const { sms } = req.body;

  if (!sms) {
    return res.status(400).json({ error: "SMS is required" });
  }

  const parsed = parseSMS(sms);

  const query = `
    INSERT INTO transactions (amount, sender, type, category)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [parsed.amount, parsed.sender, parsed.type, parsed.category],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }

      res.json({
        message: "Transaction saved",
        data: parsed
      });
    }
  );
});

// GET all transactions
router.get("/", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;