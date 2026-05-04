// below is an transaction api route

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const parseSMS = require("../utils/parser");

// POST transaction (paste SMS)
router.post("/", (req, res) => {
  const { sms, group_id } = req.body;

  if (!sms) {
    return res.status(400).json({ error: "SMS is required" });
  }

  const parsed = parseSMS(sms);

  const query = `
    INSERT INTO transactions 
    (amount, sender, type, category, group_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      parsed.amount,
      parsed.sender,
      parsed.type,
      parsed.category,
      group_id || null   // 👈 IMPORTANT FIX
    ],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          error: "DB error",
          details: err.message
        });
      }

      res.json({
        message: "Transaction saved",
        data: parsed,
        id: result.insertId,
        group_id: group_id || null
      });
    }
  );
});

// GET all transactions
router.get("/", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(results);
  });
});

module.exports = router;