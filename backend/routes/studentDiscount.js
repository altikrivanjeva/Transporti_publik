import express from "express";
import multer from "multer";
import path from "path";
import { StudentDiscount } from "../models/index.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/student_ids/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { name, email } = req.body;
  const file_path = req.file ? (req.file.path.replace(/\\/g, '/').replace(/^.*uploads\//, 'uploads/')) : null;

  console.log('TE DHENAT NGA FRONTEND:', { name, email, file_path, body: req.body, file: req.file });

  if (!name || !email || !file_path) {
    console.error('MUNGON FUSHA:', { name, email, file_path, body: req.body, file: req.file });
    return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
  }

  try {
    const newRecord = await StudentDiscount.create({ name, email, file_path });
    console.log('INSERT U KRYE ME SUKSES:', newRecord);
    res.json({ message: 'Aplikimi u ruajt me sukses!' });
  } catch (err) {
    console.error("DB ERROR:", err, { name, email, file_path });
    res.status(500).json({ message: 'Gabim gjatë ruajtjes në databazë.' });
  }
});

export default router;
