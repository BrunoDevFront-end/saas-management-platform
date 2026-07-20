import { Router } from "express";
import { formController } from "../controllers/formController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rota pública
router.get("/public/:formId", formController.publicShow);

// A partir daqui todas as rotas exigem autenticação
router.use(authMiddleware);

router.post("/", formController.create);
router.get("/", formController.list);
router.delete("/:id", formController.delete);
router.patch("/:id/toggle", formController.toggleActive);

export default router;
