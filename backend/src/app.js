import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API SWinch funcionando 🚀",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

export default app;