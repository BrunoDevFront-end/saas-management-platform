import rateLimit from "express-rate-limit";

/**
 * Rate limiters por rota sensível.
 * Cada limiter é por IP (padrão do express-rate-limit).
 */

/** Login: 5 tentativas / 15 min — mitiga brute-force de senha. */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Muitas tentativas de login. Tente novamente em alguns minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/** Cadastro: 5 registros / hora — mitiga criação em massa de contas. */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    error: "Muitas tentativas de cadastro. Tente novamente mais tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/** Feedback público: 10 envios / 10 min — mitiga spam/flood no formulário. */
export const feedbackLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    error: "Muitos envios em pouco tempo. Tente novamente mais tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
