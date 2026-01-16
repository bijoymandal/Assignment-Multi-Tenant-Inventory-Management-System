import express from "express";
import cors from "cors";
import fs from "fs";
import LoginRouter from './features/login/routes/login.routes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";




dotenv.config();
await connectDB();
const apiDocs = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url), "utf-8")
);
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));


app.use('/api',LoginRouter);

app.get("/", (req, res) => {
  res.send("Node project setup successful 🚀");
});

export default app;
