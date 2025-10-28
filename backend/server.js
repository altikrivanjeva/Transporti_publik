import express from "express";
import cors from "cors";
import stopsRoutes from "./routes/stops.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/stops", stopsRoutes);


app.listen(5001, () => console.log("🚀 Serveri po punon në portin 5001"));
