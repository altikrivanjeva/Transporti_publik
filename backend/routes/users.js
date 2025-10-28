import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Merr të gjithë user-at
router.get("/", (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Gabim gjatë marrjes së userave!" });
    res.json(result);
  });
});

// 🗑️ Fshi user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Gabim gjatë fshirjes!" });
    res.json({ message: "Useri u fshi me sukses!" });
  });
});

// ✏️ Përditëso user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  db.query(
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
    [username, email, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Gabim gjatë përditësimit!" });
      res.json({ message: "Useri u përditësua me sukses!" });
    }
  );
});

export default router;
