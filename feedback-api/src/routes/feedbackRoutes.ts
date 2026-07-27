import { Router } from "express";
import { feedbackController } from "../controllers/feedbackController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { feedbackLimiter } from "../middlewares/rateLimiters";

const router = Router();

// rota pública — funcionário envia feedback anônimo via slug da empresa
router.post("/public/:slug", feedbackLimiter, feedbackController.create);

// rotas privadas
router.get("/:formId", authMiddleware, feedbackController.list);
router.delete("/:feedbackId", authMiddleware, feedbackController.deletar);

export default router;
