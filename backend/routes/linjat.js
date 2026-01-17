import express from "express";
import ClientLinjat from "../models/ClientLinjat.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { emri, mbiemri, linja, stops, email } = req.body;

    if (!emri || !mbiemri || !linja || stops === "" || stops === undefined || !email) {
      return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme" });
    }

    const stopsNum = Number(stops);
    const basePrice = 0.5;
    const perStop = 0.2;
    const price = (basePrice + stopsNum * perStop).toFixed(2);

    const newTicket = await ClientLinjat.create({
      emri,
      mbiemri,
      linja,
      stops: stopsNum,
      price,
      email
    });

    res.status(201).json(newTicket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gabim në server" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const { email, admin } = req.query;

    if (admin === "true") {
      const rows = await ClientLinjat.findAll({
        order: [["created_at", "DESC"]]
      });
      return res.json(rows);
    }

    if (!email) {
      return res.status(400).json({ message: "Email-i është i detyrueshëm" });
    }

    const rows = await ClientLinjat.findAll({
      where: { email },
      order: [["created_at", "DESC"]]
    });

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gabim në server" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { emri, mbiemri, linja, stops, email } = req.body;

    const stopsNum = Number(stops);
    const basePrice = 0.5;
    const perStop = 0.2;
    const price = (basePrice + stopsNum * perStop).toFixed(2);

    await ClientLinjat.update(
      { emri, mbiemri, linja, stops: stopsNum, price, email },
      { where: { id } }
    );

    res.json({ message: "Bileta u përditësua" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gabim në server" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ClientLinjat.destroy({ where: { id } });
    res.json({ message: "Bileta u fshi" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gabim në server" });
  }
});

export default router;
