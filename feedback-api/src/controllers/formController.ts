import { Request, Response } from "express";
import prisma from "../prisma/client";

export const formController = {
  /**
   * POST /forms
   * Cria um novo formulário para a empresa autenticada. Rota privada.
   */
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      // req.company vem do authMiddleware — já sabemos quem está logado
      const companyId = req.company!.id;

      if (!title) {
        return res.status(400).json({ error: "Título é obrigatório" });
      }

      const form = await prisma.form.create({
        data: {
          title,
          description,
          companyId,
        },
      });

      return res.status(201).json(form);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  /**
   * GET /forms
   * Lista os formulários da empresa autenticada, incluindo a contagem
   * de feedbacks recebidos por cada um.
   */
  async list(req: Request, res: Response) {
    try {
      const companyId = req.company!.id;

      const forms = await prisma.form.findMany({
        where: { companyId },
        include: {
          _count: {
            select: { feedbacks: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(forms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  /**
   * PATCH /forms/:id/toggle
   * Ativa ou desativa um formulário (toggle do campo isActive).
   * Um formulário inativo deixa de aceitar novos feedbacks (ver feedbackController.create),
   * mas os feedbacks já recebidos permanecem disponíveis.
   * Só afeta formulários que pertencem à empresa autenticada.
   */
  async toggleActive(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const companyId = req.company!.id;

      const form = await prisma.form.findFirst({
        where: { id, companyId },
      });

      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado" });
      }

      const updated = await prisma.form.update({
        where: { id },
        data: { isActive: !form.isActive },
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
