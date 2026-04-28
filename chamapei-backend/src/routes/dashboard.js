// Below is a dashboard api route

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET dashboard summary
router.get("/", (req, res) => {
  const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
    FROM transactions
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "DB error" });
    }

    const income = results[0].total_income || 0;
    const expense = results[0].total_expense || 0;
    const balance = income - expense;

    res.json({
      total_income: income,
      total_expense: expense,
      balance: balance
    });
  });
});

module.exports = router;