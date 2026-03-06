import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql2"; // Shtuar për lidhjen me databazën

// Importet ekzistuese të rrugëve tua
import stopsRoutes from "./routes/stops.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import companiesRoutes from "./routes/companies.js";
import ticketsRoutes from "./routes/tickets.js";
import studentDiscountRouter from "./routes/studentDiscount.js";
import contactRouter from "./routes/contact.js";
import linjatRoutes from "./routes/linjat.js";

const app = express();

// --- LIDHJA ME DATABAZËN (Sipas diagramit të detyrës) ---
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Nëse ke fjalëkalim në XAMPP, shkruaje këtu
    database: "transporti_publik"
});

db.connect((err) => {
    if (err) {
        console.error("Gabim gjatë lidhjes me MySQL:", err);
    } else {
        console.log("✅ U lidh me databazën: transporti_publik");
    }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// ==========================================
// --- RRUGËT E REJA (EKIPET DHE LOJTARËT) ---
// ==========================================

// 1. Rruga për të marrë të gjitha ekipet (Pika a)
app.get('/teams', (req, res) => {
    // Tabela në phpMyAdmin quhet 'team' me shkronjë të vogël
    const sql = "SELECT * FROM team";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Gabim gjatë marrjes së ekipeve:", err);
            console.error("KONTROLLO: A ekziston tabela 'team' në phpMyAdmin?");
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Ekipet u dërguan nga DB:", result);
        console.log("Numri i ekipeve:", result.length);
        res.json(result);
    });
});

// Përditësimi i emrit të ekipit (Detyra pika e)
app.put('/teams/:id', (req, res) => {
    const { Name } = req.body;
    db.query('UPDATE team SET Name=? WHERE TeamId=?', [Name, req.params.id], (err, result) => {
        if (err) {
            console.error("❌ Gabim gjatë përditësimit:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Ekipi u përditësua!" });
    });
});

// 2. Rruga për të marrë lojtarët me JOIN (Pika c)
app.get('/players', (req, res) => {
    const sql = `
        SELECT Player.*, team.Name AS TeamName 
        FROM Player 
        INNER JOIN team ON Player.TeamId = team.TeamId
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Gabim gjatë marrjes së lojtarëve:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Lojtarët u dërguan:", result);
        res.json(result);
    });
});

// 3. Rruga për të shtuar një lojtar të ri (Pika b)
app.post('/players', (req, res) => {
    const { Name, Number, BirthYear, TeamId } = req.body;
    const sql = "INSERT INTO Player (Name, Number, BirthYear, TeamId) VALUES (?, ?, ?, ?)";
    db.query(sql, [Name, Number, BirthYear, TeamId], (err, result) => {
        if (err) {
            console.error("❌ Gabim gjatë shtimit të lojtarit:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Lojtari u shtua me sukses!" });
    });
});

// Fshirja e lojtarit (Detyra pika d)
app.delete('/players/:id', (req, res) => {
    db.query('DELETE FROM Player WHERE PlayerId = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error("❌ Gabim gjatë fshirjes:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Lojtari u fshi!" });
    });
});

// ==========================================
// --- RRUGËT TUAJA EKZISTUESE ---
// ==========================================
app.use("/stops", stopsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/companies", companiesRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/linjat", linjatRoutes);
app.use("/api/student-discount", studentDiscountRouter);
app.use("/api/contact", contactRouter);

// Startimi i serverit
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Serveri po punon në portin ${PORT}`));