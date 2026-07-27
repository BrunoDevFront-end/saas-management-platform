import { Request, Response } from "express";
import prisma from "../prisma/client";

export const feedbackController = {
  async create(req: Request, res: Response) {
    try {
      const slug = String(req.params.slug);
      const { content, formId, rating } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ error: "Conteúdo do feedback é obrigatório" });
      }

      const company = await prisma.company.findUnique({
        where: { slug },
      });

      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }

      const form = await prisma.form.findFirst({
        where: {
          id: String(formId),
          companyId: company.id,
          isActive: true,
        },
      });

      if (!form) {
        return res
          .status(404)
          .json({ error: "Formulário não encontrado ou inativo" });
      }

      const feedback = await prisma.feedback.create({
        data: {
          content,
          formId: form.id,
          rating,
        },
      });

      return res
        .status(201)
        .json({ message: "Feedback enviado com sucesso!", id: feedback.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const formId = String(req.params.formId);
      const companyId = req.company!.id;

      const form = await prisma.form.findFirst({
        where: { id: formId, companyId },
      });

      if (!form) {
        return res.status(404).json({ error: "Formulário não encontrado" });
      }

      const feedbacks = await prisma.feedback.findMany({
        where: { formId },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(feedbacks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const feedbackId = String(req.params.feedbackId);

      const feedback = await prisma.feedback.delete({
        where: {
          id: feedbackId,
        },
      });
      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
