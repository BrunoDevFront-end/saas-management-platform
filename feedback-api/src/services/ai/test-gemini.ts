import "dotenv/config";
import { analyzeFeedbacks } from "./gemini.service";

async function testGemini() {
  try {
    const result = await analyzeFeedbacks([
      "A comunicação entre os setores precisa melhorar.",
      "Estou satisfeito com o ambiente de trabalho.",
      "A liderança poderia ouvir mais os colaboradores.",
    ]);

    console.log("Resultado da análise:");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("Erro ao testar Gemini:", error);
  }
}

testGemini();
