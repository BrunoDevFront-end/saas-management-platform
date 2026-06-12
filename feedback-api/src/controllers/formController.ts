import { Request, Response } from "express";
import prisma from "../prisma/client";

export const formController = {
  // Cria um novo formulário
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

  // Lista todos os formulários da empresa logada
  async list(req: Request, res: Response) {
    try {
      const companyId = req.company!.id;

      const forms = await prisma.form.findMany({
        where: { companyId },
        // Conta quantos feedbacks cada form tem
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

  // Ativa ou desativa um formulário
  async toggleActive(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const companyId = req.company!.id;

      // Verifica se o form existe e pertence à empresa logada
      const form = await prisma.form.findFirst({
        where: { id, companyId },
      });

      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado" });
      }

      // Inverte o estado atual — se estava ativo vira inativo e vice-versa
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
