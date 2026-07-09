import { Router } from "express";
import { feedbackController } from "../controllers/feedbackController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { feedbackLimiter } from "../middlewares/rateLimiters";

const router = Router();

/** Rota pública — funcionário envia feedback anônimo via slug da empresa. */
router.post("/public/:slug", feedbackLimiter, feedbackController.create);

/** Rota privada — admin autenticado lista feedbacks de um form específico. */
router.delete("/:feedbackId", authMiddleware, feedbackController.deletar);
router.get("/:formId", authMiddleware, feedbackController.list);

export default router;
