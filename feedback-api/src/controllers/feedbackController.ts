import { Request, Response } from "express";
import prisma from "../prisma/client";

export const feedbackController = {
  /**
   * POST /feedbacks/public/:slug
   * Recebe um feedback anônimo para um formulário de uma empresa. Rota pública.
   *
   * Fluxo: valida conteúdo -> resolve empresa pelo slug -> confirma que o
   * formulário pertence à empresa e está ativo -> persiste feedback.
   * Nenhum dado do remetente é salvo (nem IP, nem sessão) — anonimato garantido
   * a nível de schema, não apenas de UI.
   */
  async create(req: Request, res: Response) {
    try {
      const slug = String(req.params.slug);
      const { content, formId } = req.body;

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

      // isActive: false bloqueia novos envios sem precisar deletar o formulário.
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

  /**
   * GET /feedbacks/:formId
   * Lista os feedbacks de um formulário. Rota privada (requer authMiddleware).
   *
   * O formulário só é retornado se pertencer à empresa autenticada
   * (req.company.id) — impede que uma empresa veja feedbacks de outra.
   */
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
