import { Request, Response } from "express";
import prisma from "../prisma/client";

export const formController = {
  async publicShow(req: Request, res: Response) {
    try {
      const formId = String(req.params.formId);

      const form = await prisma.form.findFirst({
        where: { id: formId, isActive: true },
        select: {
          id: true,
          title: true,
          description: true,
          activeRating: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!form) {
        return res
          .status(404)
          .json({ error: "Formulário não encontrado ou inativo" });
      }

      return res.status(200).json(form);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, description, activeRating } = req.body;
      const companyId = req.company!.id;

      if (!title) {
        return res.status(400).json({ error: "Título é obrigatório" });
      }

      const form = await prisma.form.create({
        data: {
          title,
          description,
          companyId,
          activeRating,
        },
      });

      return res.status(201).json(form);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

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

      // formulário inativo não aceita novos envios, mas mantém o histórico
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

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const companyId = req.company!.id;

      const form = await prisma.form.findFirst({
        where: { id, companyId },
      });

      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado" });
      }

      const updated = await prisma.form.delete({
        where: { id },
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
