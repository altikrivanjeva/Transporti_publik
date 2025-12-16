import express from "express";
import db from "../db.js";

const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
  }
  db.query(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gabim gjatë ruajtjes në databazë.' });
      }
      res.json({ message: 'Mesazhi u dërgua me sukses!' });
    }
  );
});

export default router;
