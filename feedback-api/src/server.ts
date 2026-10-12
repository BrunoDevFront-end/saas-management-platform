import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./prisma/client";
import companyRoutes from "./routes/companyRoutes";
import formRoutes from "./routes/formRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = process.env.FRONTEND_URL?.split(",").map((url) =>
  url.trim(),
) || ["http://localhost:3000"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (req, res) => {
  res.json({ status: "API rodando!" });
});

app.get("/health/db", async (req, res) => {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || req.headers["x-cron-secret"] !== cronSecret) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Erro ao verificar o banco de dados:", error);

    return res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/companies", companyRoutes);
app.use("/forms", formRoutes);
app.use("/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
