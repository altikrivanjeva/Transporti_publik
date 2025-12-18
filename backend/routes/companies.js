import express from "express";
import { Company } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    console.error("GET /companies error:", err);
    res.status(500).json({ message: "Gabim gjatë marrjes së kompanive!", error: err.message });
  }
});


router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;

  const phoneClean = String(phone || "").trim();
  const phoneRegex = /^\+?\d{7,15}$/;

  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: "Emri i kompanisë është i detyrueshëm!" });
  }
  if (!phoneClean || !phoneRegex.test(phoneClean)) {
    return res.status(400).json({ message: "Numri i telefonit është i detyrueshëm dhe duhet të jetë 7-15 shifra (opsional + në fillim)." });
  }

  try {
    const newCompany = await Company.create({
      name,
      phone: phoneClean || null,
      email: email || null
    });
    res.json(newCompany);
  } catch (err) {
    console.error("POST /companies error:", err);
    res.status(500).json({ message: "Gabim gjatë shtimit të kompanisë!", error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  const phoneClean = String(phone || "").trim();

  try {
    const [updated] = await Company.update({
      name,
      phone: phoneClean || null,
      email: email || null
    }, {
      where: { id }
    });

    if (updated) {
      // Fetch the updated company to return it, maintaining previous API behavior
      const updatedCompany = await Company.findByPk(id);
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: "Kompania nuk u gjet!" });
    }
  } catch (err) {
    console.error("PUT /companies/:id error:", err);
    res.status(500).json({ message: "Gabim gjatë përditësimit!", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Company.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Kompania u fshi me sukses!" });
    } else {
      res.status(404).json({ message: "Kompania nuk u gjet!" });
    }
  } catch (err) {
    console.error("DELETE /companies/:id error:", err);
    res.status(500).json({ message: "Gabim gjatë fshirjes!", error: err.message });
  }
});

export default router;
