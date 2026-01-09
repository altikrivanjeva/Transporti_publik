import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

// ✅ Merr të gjithë user-at
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së userave!", error: err.message });
  }
});

// 🗑️ Fshi user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Useri u fshi me sukses!" });
    } else {
      res.status(404).json({ message: "Useri nuk u gjet!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë fshirjes!", error: err.message });
  }
});

// ✏️ Përditëso user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const [updated] = await User.update(
      { username, email },
      { where: { id } }
    );
    if (updated) {
      res.json({ message: "Useri u përditësua me sukses!" });
    } else {
      res.status(404).json({ message: "Useri nuk u gjet!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë përditësimit!", error: err.message });
  }
});

export default router;
