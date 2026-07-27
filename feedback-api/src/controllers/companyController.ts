import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// mesma regra de complexidade do formulário de registro no frontend
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z.object({
  name: z.string().trim().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  email: z.string().trim().email("Digite um e-mail válido"),
  password: z
    .string()
    .max(72, "Senha muito longa")
    .regex(
      passwordRegex,
      "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
    ),
  segment: z.string().trim().optional(),
});

export const companyController = {
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

      // nomes de empresa iguais/parecidos geram o mesmo slug — desempata com um sufixo
      if (slugExists) {
        slug = `${slug}-${Math.floor(Math.random() * 9999)}`;
      }

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

      // mensagem genérica em ambos os casos de falha, pra não expor quais e-mails existem
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

  async publicShow(req: Request, res: Response) {
    try {
      const slug = String(req.params.slug);

      const company = await prisma.company.findUnique({
        where: { slug },
        select: {
          name: true,
          forms: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });

      if (!company) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }

      return res.status(200).json(company);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

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
};
