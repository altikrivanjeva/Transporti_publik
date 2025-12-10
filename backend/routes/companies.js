import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Merr të gjitha kompanitë
router.get("/", (req, res) => {
  db.query("SELECT * FROM bus_companies", (err, result) => {
    if (err) {
      console.error("GET /companies error:", err);
      return res.status(500).json({ message: "Gabim gjatë marrjes së kompanive!", error: err.message });
    }
    res.json(result);
  });
});

// ➕ Shto një kompani
router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: "Emri i kompanisë është i detyrueshëm!" });
  }

  db.query(
    "INSERT INTO bus_companies (name, phone, email) VALUES (?, ?, ?)",
    [name, phone || null, email || null],
    (err, result) => {
      if (err) {
        console.error("POST /companies error:", err);
        return res.status(500).json({ message: "Gabim gjatë shtimit të kompanisë!", error: err.message });
      }
      res.json({ id: result.insertId, name, phone, email });
    }
  );
});

// ✏️ Përditëso një kompani
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Emri i kompanisë është i detyrueshëm!" });
  }

  db.query(
    "UPDATE bus_companies SET name = ?, phone = ?, email = ? WHERE id = ?",
    [name, phone || null, email || null, id],
    (err) => {
      if (err) {
        console.error("PUT /companies/:id error:", err);
        return res.status(500).json({ message: "Gabim gjatë përditësimit!", error: err.message });
      }
      res.json({ id, name, phone, email });
    }
  );
});

// 🗑️ Fshi një kompani
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM bus_companies WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("DELETE /companies/:id error:", err);
      return res.status(500).json({ message: "Gabim gjatë fshirjes!", error: err.message });
    }
    res.json({ message: "Kompania u fshi me sukses!" });
  });
});

export default router;
