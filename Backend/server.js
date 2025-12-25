import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());
app.use("/api/passwords", passwordRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Password Manager API running");
});

const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
