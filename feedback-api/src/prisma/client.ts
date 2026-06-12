import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
});

prisma
  .$connect()
  .then(() => console.log(" Banco de dados conectado!"))
  .catch((err) => console.error(" Erro ao conectar no banco:", err));

export default prisma;
