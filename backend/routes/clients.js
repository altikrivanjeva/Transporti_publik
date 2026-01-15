import express from "express";
import db from "../db.js";

const router = express.Router();

// CREATE - regjistro klient
router.post("/", (req, res) => {
  const { emri, mbiemri, data_nisjes, nisja, destinacioni, linja_id } = req.body;

  db.query(
    "INSERT INTO clients (emri, mbiemri, data_nisjes, nisja, destinacioni, linja_id) VALUES (?, ?, ?, ?, ?, ?)",
    [emri, mbiemri, data_nisjes, nisja, destinacioni, linja_id || null],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        emri,
        mbiemri,
        data_nisjes,
        nisja,
        destinacioni,
        linja_id,
      });
    }
  );
});

export default router;
