import { Router } from "express";
import { companyController } from "../controllers/companyController";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiters";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// rotas públicas
router.post("/register", registerLimiter, companyController.register);
router.post("/login", loginLimiter, companyController.login);
router.get("/public/:slug", companyController.publicShow);

// rota privada
router.get("/stats", authMiddleware, companyController.stats);

export default router;
