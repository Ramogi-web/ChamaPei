// Below is a dashboard api route

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ALL GROUPS SUMMARY
router.get("/", (req, res) => {
  const query = `
    SELECT 
      group_id,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
    FROM transactions
    GROUP BY group_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
        details: err.message
      });
    }

    res.json(results.map(r => ({
      group_id: r.group_id,
      total_income: r.total_income,
      total_expense: r.total_expense,
      balance: r.total_income - r.total_expense
    })));
  });
});

// SINGLE GROUP SUMMARY
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
    FROM transactions
    WHERE group_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
        details: err.message
      });
    }

    const income = results[0].total_income;
    const expense = results[0].total_expense;

    res.json({
      group_id: Number(id),
      total_income: income,
      total_expense: expense,
      balance: income - expense
    });
  });
});

module.exports = router;