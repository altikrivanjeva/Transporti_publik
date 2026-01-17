import express from "express";
import { Stop } from "../models/index.js";

const router = express.Router();

// Merr të gjitha stacionet
router.get("/", async (req, res) => {
  try {
    const stops = await Stop.findAll();
    res.json(stops);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Shto një stacion
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Emri i stacionit është i detyrueshëm" });
  }

  try {
    const newStop = await Stop.create({ name });
    res.json(newStop);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit një stacion
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Emri i stacionit është i detyrueshëm" });
  }

  try {
    const [updated] = await Stop.update({ name }, { where: { id } });
    if (updated) {
      const updatedStop = await Stop.findByPk(id);
      res.json(updatedStop);
    } else {
      res.status(500).json({ message: "Gabim" }); // Keeping consistent with previous generic error
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Fshi një stacion
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Stop.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Stacioni u fshi me sukses" });
    } else {
      res.status(500).json({ message: "Gabim" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
