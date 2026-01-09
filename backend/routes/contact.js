import express from "express";
import { Contact } from "../models/index.js";

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
  }

  try {
    await Contact.create({ name, email, message });
    res.json({ message: 'Mesazhi u dërgua me sukses!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim gjatë ruajtjes në databazë.' });
  }
});

export default router;
