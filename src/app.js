import express from "express";
import cors from "cors";
// import LoginRouter from './feature/auth/login.route.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();
await connectDB();
const app = express();

app.use(cors());
app.use(express.json());



// app.use('/api/auth',LoginRouter);

app.get("/", (req, res) => {
  res.send("Node project setup successful 🚀");
});

export default app;
