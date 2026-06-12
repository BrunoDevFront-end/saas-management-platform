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

app.use(cors());

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
