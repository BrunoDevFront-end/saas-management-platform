import { Router } from "express";
import { companyController } from "../controllers/companyController";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiters";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * Rotas de autenticação/cadastro de empresa.
 * Públicas — não passam por authMiddleware.
 */
router.post("/register", registerLimiter, companyController.register);
router.post("/login", loginLimiter, companyController.login);
router.get("/public/:slug", companyController.publicShow);
/**
 * GET /companies/stats
 * Retorna estatísticas agregadas da empresa autenticada. Rota privada.
 */
router.get("/stats", authMiddleware, companyController.stats);

export default router;
