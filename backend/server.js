import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2";

// Importet ekzistuese
import stopsRoutes from "./routes/stops.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import companiesRoutes from "./routes/companies.js";
import ticketsRoutes from "./routes/tickets.js";
import studentDiscountRouter from "./routes/studentDiscount.js";
import contactRouter from "./routes/contact.js";
import linjatRoutes from "./routes/linjat.js";

const app = express();

// --- LIDHJA ME DATABAZËN ---
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

// --- FABRIKAT (CRUD) ---
app.get('/fabrikat', (req, res) => {
    db.query('SELECT * FROM Fabrika', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/fabrikat', (req, res) => {
    const { EmriFabrikes, Lokacioni } = req.body;
    db.query('INSERT INTO Fabrika (EmriFabrikes, Lokacioni) VALUES (?, ?)',
        [EmriFabrikes, Lokacioni], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.put('/fabrikat/:id', (req, res) => {
    const { EmriFabrikes, Lokacioni } = req.body;
    db.query('UPDATE Fabrika SET EmriFabrikes=?, Lokacioni=? WHERE ID=?',
        [EmriFabrikes, Lokacioni, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

// --- PUNETORI (CRUD me JOIN) ---
app.get('/punetoret', (req, res) => {
    // Shfaq Punëtorin dhe Emrin e Fabrikës përkatëse
    db.query('SELECT P.*, F.EmriFabrikes FROM Punetori P JOIN Fabrika F ON P.ID_Fabrika = F.ID',
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.post('/punetoret', (req, res) => {
    const { Emri, Mbiemri, Pozita, ID_Fabrika } = req.body;
    db.query('INSERT INTO Punetori (Emri, Mbiemri, Pozita, ID_Fabrika) VALUES (?, ?, ?, ?)',
        [Emri, Mbiemri, Pozita, ID_Fabrika], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.delete('/punetoret/:id', (req, res) => {
    db.query('DELETE FROM Punetori WHERE ID = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// --- ROUTES EKZISTUESE ---
app.use("/stops", stopsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/companies", companiesRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/linjat", linjatRoutes);
app.use("/api/student-discount", studentDiscountRouter);
app.use("/api/contact", contactRouter);

app.listen(5001, () => console.log("🚀 Serveri po punon në portin 5001"));