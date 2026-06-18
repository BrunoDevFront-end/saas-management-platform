import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extende o tipo Request do Express para incluir o campo "company",
// que é injetado por este middleware e consumido pelos controllers.
declare global {
  namespace Express {
    interface Request {
      company?: {
        id: string;
        email: string;
      };
    }
  }
}

/**
 * Middleware de autenticação. Valida o JWT enviado no header
 * `Authorization: Bearer <token>` e injeta `req.company` com o id e
 * e-mail da empresa autenticada.
 *
 * Aplicado em todas as rotas privadas (forms e listagem de feedbacks).
 * Em caso de token ausente, malformado, expirado ou inválido, responde 401
 * e a requisição não chega ao controller.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // "Bearer eyJhbG..." -> ["Bearer", "eyJhbG..."]
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    req.company = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
