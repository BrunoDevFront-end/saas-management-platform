import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extende o tipo Request do Express para incluir o campo "company"
// Por padrão o req não tem esse campo — precisamos adicionar
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

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1. Pega o header Authorization da requisição
  // O front-end envia assim: "Bearer eyJhbGciOiJIUzI1NiJ9..."
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // 2. Separa o "Bearer" do token em si
  // "Bearer eyJhbG..." → ["Bearer", "eyJhbG..."]
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    // 3. Verifica se o token é válido usando o JWT_SECRET
    // Se o token foi adulterado ou expirou, o jwt.verify lança um erro
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    // 4. Injeta os dados da empresa no req para usar nos controllers
    // Assim qualquer rota protegida sabe quem está fazendo a requisição
    req.company = {
      id: decoded.id,
      email: decoded.email,
    };

    // 5. Chama next() para seguir para o controller
    // Sem o next() a requisição trava aqui e nunca chega no destino
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
