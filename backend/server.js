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
app.get('/aeroporti', (req, res) => {
    db.query('SELECT * FROM Aeroporti', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/aeroporti', (req, res) => {
    const { EmriAeroportit, Qyteti } = req.body;
    db.query('INSERT INTO Aeroporti (EmriAeroportit, Qyteti) VALUES (?, ?)',
        [EmriAeroportit, Qyteti], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.put('/aeroporti/:id', (req, res) => {
    const { EmriAeroportit, Qyteti } = req.body;
    db.query('UPDATE Aeroporti SET EmriAeroportit=?, Qyteti=? WHERE AeroportiID=?',
        [EmriAeroportit, Qyteti, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

// --- LIGJERATAT ---
app.get('/fluturimi', (req, res) => {
    db.query('SELECT Fluturimi.*, Aeroporti.EmriAeroportit FROM Fluturimi JOIN Aeroporti ON Fluturimi.AeroportiID = Aeroporti.AeroportiID',
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.post('/fluturimi', (req, res) => {
    const { NrFluturimit, Destinacionet, AeroportiID } = req.body;
    db.query('INSERT INTO Fluturimi (NrFluturimit, Destinacionet, AeroportiID) VALUES (?, ?, ?)',
        [NrFluturimit, Destinacionet, AeroportiID], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
});

app.delete('/fluturimi/:id', (req, res) => {
    db.query('DELETE FROM Fluturimi WHERE FluturimiID = ?', [req.params.id], (err, result) => {
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
