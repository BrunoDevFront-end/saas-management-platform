import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";

// Gera um slug a partir do nome da empresa
// Ex: "Minha Empresa" → "minha-empresa"
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .replace(/[^a-z0-9\s]/g, "") // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-"); // substitui espaços por hífen
}

export const companyController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, segment } = req.body;

      const normalizedEmail = email.trim().toLowerCase();

      // 1. Valida se todos os campos foram enviados
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Nome, email e senha são obrigatórios" });
      }

      // 2. Verifica se o email já está cadastrado
      const emailExists = await prisma.company.findUnique({
        where: { email: normalizedEmail },
      });

      if (emailExists) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }

      // 3. Gera o slug e verifica se já existe
      let slug = generateSlug(name);

      const slugExists = await prisma.company.findUnique({
        where: { slug },
      });

      // Se o slug já existir, adiciona um número aleatório no final
      if (slugExists) {
        slug = `${slug}-${Math.floor(Math.random() * 9999)}`;
      }

      // 4. Criptografa a senha — o número 10 é o "salt rounds"
      // quanto maior, mais seguro mas mais lento. 10 é o padrão ideal
      const passwordHash = await bcrypt.hash(password, 10);

      // 5. Salva a empresa no banco
      const company = await prisma.company.create({
        data: {
          name,
          email: normalizedEmail,
          passwordHash,
          segment,
          slug,
        },
      });

      // 6. Retorna os dados sem expor a senha
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
      const normalizedEmail = email.trim().toLowerCase();

      // 1. Valida se os campos foram enviados
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios" });
      }

      // 2. Busca a empresa no banco pelo email
      const company = await prisma.company.findUnique({
        where: { email: normalizedEmail },
      });

      // 3. Se não encontrar, retorna erro genérico
      // Não falamos "email não existe" por segurança — evita que alguém
      // descubra quais emails estão cadastrados
      if (!company) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // 4. Compara a senha digitada com o hash salvo no banco
      // O bcrypt pega a senha pura, criptografa do mesmo jeito e compara
      const passwordMatch = await bcrypt.compare(
        password,
        company.passwordHash,
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // 5. Gera o token JWT
      // O token carrega o id e email da empresa — chamamos isso de "payload"
      // O JWT_SECRET é a chave que assina o token — só quem tem ela consegue validar
      const token = jwt.sign(
        { id: company.id, email: company.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }, // token expira em 7 dias
      );

      // 6. Retorna o token e dados básicos da empresa
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
