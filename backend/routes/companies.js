import express from "express";
import db from "../db.js";

const router = express.Router();


router.get("/", (req, res) => {
  db.query("SELECT * FROM bus_companies", (err, result) => {
    if (err) {
      console.error("GET /companies error:", err);
      return res.status(500).json({ message: "Gabim gjatë marrjes së kompanive!", error: err.message });
    }
    res.json(result);
  });
});


router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  
  const phoneClean = String(phone || "").trim();
  const phoneRegex = /^\+?\d{7,15}$/;

  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: "Emri i kompanisë është i detyrueshëm!" });
  }
  if (!phoneClean || !phoneRegex.test(phoneClean)) {
    return res.status(400).json({ message: "Numri i telefonit është i detyrueshëm dhe duhet të jetë 7-15 shifra (opsional + në fillim)." });
  }

  db.query(
    "INSERT INTO bus_companies (name, phone, email) VALUES (?, ?, ?)",
    [name, phoneClean || null, email || null],
    (err, result) => {
      if (err) {
        console.error("POST /companies error:", err);
        return res.status(500).json({ message: "Gabim gjatë shtimit të kompanisë!", error: err.message });
      }
      res.json({ id: result.insertId, name, phone: phoneClean, email });
    }
  );
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  const phoneClean = String(phone || "").trim();
  const phoneRegex = /^\+?\d{7,15}$/;

  db.query(
    "UPDATE bus_companies SET name = ?, phone = ?, email = ? WHERE id = ?",
    [name, phoneClean || null, email || null, id],
    (err) => {
      if (err) {
        console.error("PUT /companies/:id error:", err);
        return res.status(500).json({ message: "Gabim gjatë përditësimit!", error: err.message });
      }
      res.json({ id, name, phone: phoneClean, email });
    }
  );
});


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
