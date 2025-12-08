import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";

const router = express.Router();

// 🟢 Register
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Plotëso të gjitha fushat!" });
  }

  // kontrollo nëse ekziston
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Gabim në server!" });
    if (result.length > 0)
      return res.status(400).json({ message: "Ky email ekziston!" });

    // krijo hash për password
    const hash = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hash],
      (err2) => {
        if (err2)
          return res.status(500).json({ message: "Gabim gjatë regjistrimit!" });

        return res.json({ message: "U regjistrua me sukses!" });
      }
    );
  });
});

// 🟠 Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Plotëso të gjitha fushat!" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Gabim në server!" });

    if (result.length === 0)
      return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });

    const user = result[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Email ose fjalëkalim i pasaktë!" });

    return res.json({
      message: "Hyrja u krye me sukses!",
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
});

export default router;
