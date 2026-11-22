import { GoogleGenAI } from "@google/genai";
import {
  feedbackAnalysisSchema,
  type FeedbackAnalysis,
} from "./schemas/feedback-analysis.schema";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY não configurada.");
}

const genAI = new GoogleGenAI({ apiKey });

export async function analyzeFeedbacks(
  feedbacks: string[],
): Promise<FeedbackAnalysis> {
  if (feedbacks.length === 0) {
    throw new Error("Não existem feedbacks para analisar.");
  }

  const prompt = `
    Você é um especialista em análise organizacional.

    Analise os feedbacks anônimos abaixo e produza uma análise
    objetiva sobre a percepção dos colaboradores.

    Identifique:
    - Resumo geral dos feedbacks.
    - Quantidade de sentimentos positivos, negativos e neutros.
    - Categorias e temas recorrentes.
    - Problemas identificados.
    - Sugestões de melhoria com prioridades.

    Os valores de sentimento devem representar quantidades
    de feedbacks e sua soma deve corresponder ao total recebido.

    Não invente informações. Baseie sua análise exclusivamente
    nos comentários fornecidos.

    Feedbacks:
    ${JSON.stringify(feedbacks)}
  `;

  const response = await genAI.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "OBJECT",
        properties: {
          summary: { type: "STRING" },
          sentiment: {
            type: "OBJECT",
            properties: {
              positive: { type: "INTEGER" },
              negative: { type: "INTEGER" },
              neutral: { type: "INTEGER" },
            },
            required: ["positive", "negative", "neutral"],
          },
          categories: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                count: { type: "INTEGER" },
                description: { type: "STRING" },
              },
              required: ["name", "count", "description"],
            },
          },
          recurringProblems: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          suggestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                description: { type: "STRING" },
                priority: {
                  type: "STRING",
                  enum: ["low", "medium", "high"],
                },
              },
              required: ["title", "description", "priority"],
            },
          },
        },
        required: [
          "summary",
          "sentiment",
          "categories",
          "recurringProblems",
          "suggestions",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("O Gemini não retornou uma resposta.");
  }

  const parsedResponse = JSON.parse(response.text);

  return feedbackAnalysisSchema.parse(parsedResponse);
}
