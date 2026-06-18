import { Router } from "express";
import { companyController } from "../controllers/companyController";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiters";

const router = Router();

/**
 * Rotas de autenticação/cadastro de empresa.
 * Ambas públicas — não passam por authMiddleware.
 */
router.post("/register", registerLimiter, companyController.register);
router.post("/login", loginLimiter, companyController.login);

export default router;
