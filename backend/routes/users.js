import express from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);
router.put("/:id", authenticateToken, authorizeAdmin, updateUser);

export default router;
