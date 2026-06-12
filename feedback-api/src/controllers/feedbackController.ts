import { Request, Response } from "express";
import prisma from "../prisma/client";

export const feedbackController = {
  // Envia um feedback anônimo — rota pública
  async create(req: Request, res: Response) {
    try {
      const slug = String(req.params.slug);
      const { content, formId } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ error: "Conteúdo do feedback é obrigatório" });
      }

      // 1. Busca a empresa pelo slug
      const company = await prisma.company.findUnique({
        where: { slug },
      });

      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }

      // 2. Busca o formulário verificando se pertence à empresa e está ativo
      const form = await prisma.form.findFirst({
        where: {
          id: String(formId),
          companyId: company.id,
          isActive: true, // não aceita feedback se o form estiver desativado
        },
      });

      if (!form) {
        return res
          .status(404)
          .json({ error: "Formulário não encontrado ou inativo" });
      }

      // 3. Salva o feedback sem nenhum dado do usuário — anonimato garantido
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

  // Lista feedbacks de um form — rota privada (só o admin vê)
  async list(req: Request, res: Response) {
    try {
      const formId = String(req.params.formId);
      const companyId = req.company!.id;

      // Verifica se o form pertence à empresa logada
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
};
