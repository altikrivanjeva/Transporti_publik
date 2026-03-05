import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import stopsRoutes from "./routes/stops.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import companiesRoutes from "./routes/companies.js";
import ticketsRoutes from "./routes/tickets.js";
import studentDiscountRouter from "./routes/studentDiscount.js";
import contactRouter from "./routes/contact.js";
import linjatRoutes from "./routes/linjat.js";
// import clientsRoutes from "./routes/clients.js";

const app = express();

// --- LIDHJA ME DATABAZËN (Raw SQL për Menaxhimi) ---
import mysql from "mysql2";
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "transporti_publik"
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// --- LIGJERUESIT ---
app.get('/ligjeruesit', (req, res) => {
    db.query('SELECT * FROM Ligjëruesi', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/ligjeruesit', (req, res) => {
    const { LecturerName, Department, Email } = req.body;
    db.query('INSERT INTO Ligjëruesi (LecturerName, Department, Email) VALUES (?, ?, ?)',
        [LecturerName, Department, Email], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.put('/ligjeruesit/:id', (req, res) => {
    const { LecturerName, Department, Email } = req.body;
    db.query('UPDATE Ligjëruesi SET LecturerName=?, Department=?, Email=? WHERE LecturerID=?',
        [LecturerName, Department, Email, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

// --- LIGJERATAT ---
app.get('/ligjeratat', (req, res) => {
    db.query('SELECT Ligjërata.*, Ligjëruesi.LecturerName FROM Ligjërata JOIN Ligjëruesi ON Ligjërata.LecturerID = Ligjëruesi.LecturerID',
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.post('/ligjeratat', (req, res) => {
    const { LectureName, LecturerID } = req.body;
    db.query('INSERT INTO Ligjërata (LectureName, LecturerID) VALUES (?, ?)',
        [LectureName, LecturerID], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.delete('/ligjeratat/:id', (req, res) => {
    db.query('DELETE FROM Ligjërata WHERE LectureID = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.use("/stops", stopsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/companies", companiesRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/linjat", linjatRoutes);

app.use("/api/student-discount", studentDiscountRouter);
app.use("/api/contact", contactRouter);
// app.use("/clients", clientsRoutes);

app.listen(5001, () => console.log("🚀 Serveri po punon në portin 5001"));
