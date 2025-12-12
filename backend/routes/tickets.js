import express from "express";
import db from "../db.js";

const router = express.Router();

// GET /tickets?companyId=...&userId=...
router.get("/", (req, res) => {
  const { companyId, userId } = req.query;
  let sql = "SELECT * FROM tickets";
  const params = [];
  if (companyId) { sql += " WHERE company_id = ?"; params.push(companyId); }
  if (userId) {
    sql += params.length ? " AND user_id = ?" : " WHERE user_id = ?";
    params.push(userId);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Gabim në DB", error: err.message });
    res.json(results);
  });
});

// POST /tickets
router.post("/", (req, res) => {
  const { company_id, user_id, passenger_name, seat, travel_date, price } = req.body;
  if (!company_id || !passenger_name || !travel_date) {
    return res.status(400).json({ message: "company_id, passenger_name dhe travel_date janë të detyrueshme" });
  }
  db.query(
    "INSERT INTO tickets (company_id, user_id, passenger_name, seat, travel_date, price) VALUES (?, ?, ?, ?, ?, ?)",
    [company_id, user_id || null, passenger_name, seat || null, travel_date, price || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Gabim gjatë krijimit", error: err.message });
      res.json({ id: result.insertId, company_id, user_id, passenger_name, seat, travel_date, price });
    }
  );
});

// PUT /tickets/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { passenger_name, seat, travel_date, price } = req.body;
  db.query(
    "UPDATE tickets SET passenger_name = ?, seat = ?, travel_date = ?, price = ? WHERE id = ?",
    [passenger_name, seat, travel_date, price, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Gabim gjatë përditësimit", error: err.message });
      res.json({ id, passenger_name, seat, travel_date, price });
    }
  );
});

// DELETE /tickets/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tickets WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Gabim gjatë fshirjes", error: err.message });
    res.json({ message: "Bileta u fshi" });
  });
});

export default router;