import express from "express";
import cors from "cors";
import stopsRoutes from "./routes/stops.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import companiesRoutes from "./routes/companies.js";
import ticketsRoutes from "./routes/tickets.js";
import studentDiscountRouter from "./routes/studentDiscount.js";
import contactRouter from "./routes/contact.js";


const app = express();
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use(express.json());

app.use("/stops", stopsRoutes);
app.use("/auth", authRoutes); 
app.use("/users", usersRoutes);
app.use("/companies", companiesRoutes); 
app.use("/tickets", ticketsRoutes);


app.use('/api/student-discount', studentDiscountRouter);
app.use('/api/contact', contactRouter);

app.listen(5001, () => console.log("🚀 Serveri po punon në portin 5001"));
