import express from "express";
import db from "../db.js";

const router = express.Router();

// Merr të gjitha stacionet
router.get("/", (req, res) => {
  db.query("SELECT * FROM stops", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Shto një stacion
router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO stops (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name });
  });
});

// Edit një stacion
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query("UPDATE stops SET name = ? WHERE id = ?", [name, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, name });
  });
});

// Fshi një stacion
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM stops WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Stacioni u fshi me sukses" });
  });
});

export default router;
