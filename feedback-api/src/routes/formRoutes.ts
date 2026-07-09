import { Router } from "express";
import { formController } from "../controllers/formController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// authMiddleware aplicado em todas as rotas desse router
// Nenhuma rota de form funciona sem token JWT válido
router.use(authMiddleware);

router.post("/", formController.create);
router.get("/", formController.list);

router.patch("/:id/toggle", formController.toggleActive);

export default router;
