import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
const router = express.Router();

// 🟢 Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Plotëso të gjitha fushat!" });
  }

  try {
    // kontrollo nëse ekziston
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Ky email ekziston!" });
    }

    // krijo hash për password
    const hash = bcrypt.hashSync(password, 10);

    await User.create({
      username,
      email,
      password_hash: hash,
    });

    return res.json({ message: "U regjistrua me sukses!" });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Gabim gjatë regjistrimit!" });
  }
});

// 🟠 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Plotëso të gjitha fushat!" });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });

    return res.json({
      message: "Hyrja u krye me sukses!",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Gabim në server!" });
  }
});

export default router;
