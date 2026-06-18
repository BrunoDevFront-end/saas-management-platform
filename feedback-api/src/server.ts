import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./prisma/client";
import companyRoutes from "./routes/companyRoutes";
import formRoutes from "./routes/formRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

dotenv.config();

const app = express();

app.use(express.json());

/**
 * CORS restrito à origem do frontend.
 * Em dev usa http://localhost:3000 por padrão; em produção, definir
 * FRONTEND_URL no .env com a URL real (ex: https://meudominio.com).
 */
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (req, res) => {
  res.json({ status: "API rodando!" });
});

app.use("/companies", companyRoutes);
app.use("/forms", formRoutes);
app.use("/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
