import express from "express";
import { createTicket, getTickets, updateTicket, deleteTicket } from "../controllers/linjatController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createTicket);
router.get("/", authenticateToken, getTickets);
router.put("/:id", authenticateToken, updateTicket);
router.delete("/:id", authenticateToken, deleteTicket);

export default router;
