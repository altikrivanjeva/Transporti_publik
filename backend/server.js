import express from "express";
import cors from "cors";
import stopsRoutes from "./routes/stops.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stops", stopsRoutes);
app.use("/auth", authRoutes); 
app.use("/users", usersRoutes); 

app.listen(5001, () => console.log("🚀 Serveri po punon në portin 5001"));
