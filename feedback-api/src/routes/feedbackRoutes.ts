import { Router } from "express";
import { feedbackController } from "../controllers/feedbackController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rota PÚBLICA — funcionário envia feedback pelo slug da empresa
router.post("/public/:slug", feedbackController.create);

// Rota PRIVADA — admin lista feedbacks de um form
router.get("/:formId", authMiddleware, feedbackController.list);

export default router;
