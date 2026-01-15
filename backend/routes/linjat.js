import express from "express";
const router = express.Router();
import db from "../db.js"; // db connection

// CREATE - shto linjë me lidhje
router.post("/", (req, res) => {
  const { emri, nisja, destinacioni, user_id, next_stop_id, distance_km, ticket_price } = req.body;
  db.query(
    `INSERT INTO linjat (emri, nisja, destinacioni, user_id, next_stop_id, distance_km, ticket_price)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [emri, nisja, destinacioni, user_id || null, next_stop_id || null, distance_km || null, ticket_price || null],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, emri, nisja, destinacioni, user_id, next_stop_id, distance_km, ticket_price });
    }
  );
});

// READ ALL
router.get("/", (req, res) => {
  db.query("SELECT * FROM linjat", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// READ ONE
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM linjat WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).send("Linja nuk u gjet");
    res.json(results[0]);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { emri, nisja, destinacioni, next_stop_id, distance_km, ticket_price } = req.body;
  db.query(
    `UPDATE linjat SET emri = ?, nisja = ?, destinacioni = ?, next_stop_id = ?, distance_km = ?, ticket_price = ? WHERE id = ?`,
    [emri, nisja, destinacioni, next_stop_id || null, distance_km || null, ticket_price || null, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.send("Linja u përditësua me sukses");
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM linjat WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.send("Linja u fshi me sukses");
  });
});

// GET route nga pika A → B
router.get("/route", (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).send("Duhet të specifikohet nisja dhe destinacioni");

  db.query("SELECT * FROM linjat", (err, linjat) => {
    if (err) return res.status(500).json(err);

    let route = [];
    let current = linjat.find(l => l.nisja === from);
    while (current && current.destinacioni !== to) {
      route.push(current);
      if (!current.next_stop_id) break;
      current = linjat.find(l => l.id === current.next_stop_id);
    }

    if (current && current.destinacioni === to) {
      route.push(current);
      const totalDistance = route.reduce((sum, r) => sum + (r.distance_km || 0), 0);
      const totalPrice = route.reduce((sum, r) => sum + (r.ticket_price || 0), 0);
      return res.json({ route, totalDistance, totalPrice });
    }

    res.status(404).send("Nuk u gjet rruga nga pika A tek pika B");
  });
});

export default router;
