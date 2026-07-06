import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";

/**
 * Gera um slug único a partir do nome da empresa.
 * Remove acentos, caracteres especiais e espaços (ex: "Café & Cia" -> "cafe-cia").
 * Usado na rota pública de feedback (/feedbacks/public/:slug).
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Mesma regra de complexidade exigida no frontend (página de registro):
// mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Regras de validação do cadastro de empresa.
 * Validado no backend independentemente do frontend, já que a API
 * pode ser chamada diretamente (Postman, curl, etc.) — sem isso, alguém
 * poderia criar uma conta com senha fraca contornando o formulário.
 */
const registerSchema = z.object({
  name: z.string().trim().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  email: z.string().trim().email("Digite um e-mail válido"),
  password: z
    .string()
    .max(72, "Senha muito longa") // bcrypt ignora bytes após o 72º
    .regex(
      passwordRegex,
      "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
    ),
  segment: z.string().trim().optional(),
});

export const companyController = {
  async stats(req: Request, res: Response) {
    try {
      const companyId = req.company!.id;
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const [activeForms, totalFeedbacks, feedbacksLast7Days] =
        await Promise.all([
          prisma.form.count({
            where: { companyId, isActive: true },
          }),
          prisma.feedback.count({
            where: { form: { companyId } },
          }),
          prisma.feedback.count({
            where: {
              form: { companyId },
              createdAt: { gte: sevenDaysAgo },
            },
          }),
        ]);

      return res.status(200).json({
        activeForms,
        totalFeedbacks,
        feedbacksLast7Days,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  /**
   * POST /companies/register
   * Cadastra uma nova empresa. Rota pública.
   *
   * Fluxo: valida payload -> checa e-mail duplicado -> gera slug único
   * -> hash da senha -> persiste -> retorna dados (sem a senha).
   */
  async register(req: Request, res: Response) {
    try {
      const parsed = registerSchema.safeParse(req.body);

      if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos";
        return res.status(400).json({ error: firstError });
      }

      const { name, email, password, segment } = parsed.data;
      const normalizedEmail = email.toLowerCase();

      const emailExists = await prisma.company.findUnique({
        where: { email: normalizedEmail },
      });

      if (emailExists) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }

      let slug = generateSlug(name);

      const slugExists = await prisma.company.findUnique({
        where: { slug },
      });

      // Colisão de slug (nomes de empresa iguais ou muito parecidos):
      // resolve anexando um número aleatório.
      if (slugExists) {
        slug = `${slug}-${Math.floor(Math.random() * 9999)}`;
      }

      // Salt rounds 10: padrão recomendado pelo bcrypt (custo/segurança equilibrados).
      const passwordHash = await bcrypt.hash(password, 10);

      const company = await prisma.company.create({
        data: {
          name,
          email: normalizedEmail,
          passwordHash,
          segment,
          slug,
        },
      });

      return res.status(201).json({
        id: company.id,
        name: company.name,
        email: company.email,
        slug: company.slug,
        createdAt: company.createdAt,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  /**
   * POST /companies/login
   * Autentica uma empresa e retorna um JWT (expira em 7 dias).
   * Erros de "email não existe" e "senha errada" retornam a mesma mensagem
   * genérica, para não permitir enumeração de e-mails cadastrados.
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios" });
      }

      const normalizedEmail = String(email).trim().toLowerCase();

      const company = await prisma.company.findUnique({
        where: { email: normalizedEmail },
      });

      if (!company) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        company.passwordHash,
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      const token = jwt.sign(
        { id: company.id, email: company.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        token,
        company: {
          id: company.id,
          name: company.name,
          email: company.email,
          slug: company.slug,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
