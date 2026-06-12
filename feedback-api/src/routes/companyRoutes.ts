import { Router } from "express";
import { companyController } from "../controllers/companyController";

const router = Router();

// Rota pública — qualquer um pode se cadastrar
router.post("/register", companyController.register);
router.post("/login", companyController.login);

export default router;
