const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create group
router.post("/", (req, res) => {
  const { name } = req.body;

  db.query("INSERT INTO groups (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Group created",
      groupId: result.insertId
    });
  });
});

// Get all groups
router.get("/", (req, res) => {
  db.query("SELECT * FROM groups", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add member
router.post("/:groupId/members", (req, res) => {
  const { groupId } = req.params;
  const { name } = req.body;

  const query = `
    INSERT INTO group_members (group_id, name)
    VALUES (?, ?)
  `;

  db.query(query, [groupId, name], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Member added" });
  });
});

// Get members
router.get("/:groupId/members", (req, res) => {
  const { groupId } = req.params;

  db.query(
    "SELECT * FROM group_members WHERE group_id = ?",
    [groupId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});


// Split amount
router.post("/:groupId/split", (req, res) => {
  const { groupId } = req.params;
  const { total_amount } = req.body;

  // 1. Get members
  db.query(
    "SELECT * FROM group_members WHERE group_id = ?",
    [groupId],
    (err, members) => {
      if (err) return res.status(500).json(err);

      if (members.length === 0) {
        return res.status(400).json({ error: "No members in group" });
      }

      const amount_per_member = Math.ceil(total_amount / members.length);

      // 2. Save split
      db.query(
        "INSERT INTO splits (group_id, total_amount, amount_per_member) VALUES (?, ?, ?)",
        [groupId, total_amount, amount_per_member],
        (err, result) => {
          if (err) return res.status(500).json(err);

          const splitId = result.insertId;

          // 3. Assign to members
          const values = members.map(m => [splitId, m.name, amount_per_member]);

          db.query(
            "INSERT INTO split_members (split_id, member_name, amount) VALUES ?",
            [values],
            (err) => {
              if (err) return res.status(500).json(err);

              res.json({
                message: "Split created",
                total_amount,
                members: members.length,
                amount_per_member
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;