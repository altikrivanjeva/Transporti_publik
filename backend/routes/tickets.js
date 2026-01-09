import express from "express";
import { Ticket } from "../models/index.js";

const router = express.Router();

// GET /tickets?companyId=...&userId=...
router.get("/", async (req, res) => {
  const { companyId, userId } = req.query;
  const where = {};

  if (companyId) where.company_id = companyId;
  if (userId) where.user_id = userId;

  try {
    const tickets = await Ticket.findAll({ where });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Gabim në DB", error: err.message });
  }
});

// POST /tickets
router.post("/", async (req, res) => {
  const { company_id, user_id, passenger_name, seat, travel_date, price } = req.body;
  if (!company_id || !passenger_name || !travel_date) {
    return res.status(400).json({ message: "company_id, passenger_name dhe travel_date janë të detyrueshme" });
  }

  try {
    const newTicket = await Ticket.create({
      company_id,
      user_id: user_id || null,
      passenger_name,
      seat: seat || null,
      travel_date,
      price: price || null
    });
    res.json(newTicket);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë krijimit", error: err.message });
  }
});

// PUT /tickets/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { passenger_name, seat, travel_date, price } = req.body;

  try {
    const [updated] = await Ticket.update({
      passenger_name,
      seat,
      travel_date,
      price
    }, {
      where: { id }
    });

    if (updated) {
      const updatedTicket = await Ticket.findByPk(id);
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: "Bileta nuk u gjet" });
    }
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë përditësimit", error: err.message });
  }
});

// DELETE /tickets/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Ticket.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Bileta u fshi" });
    } else {
      res.status(404).json({ message: "Bileta nuk u gjet" });
    }
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë fshirjes", error: err.message });
  }
});

export default router;