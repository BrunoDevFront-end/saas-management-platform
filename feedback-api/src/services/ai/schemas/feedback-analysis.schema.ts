import { z } from "zod";

export const feedbackAnalysisSchema = z.object({
  summary: z.string(),

  sentiment: z.object({
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
  }),

  categories: z.array(
    z.object({
      name: z.string(),
      count: z.number(),
      description: z.string(),
    }),
  ),

  recurringProblems: z.array(z.string()),

  suggestions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(["low", "medium", "high"]),
    }),
  ),
});

export type FeedbackAnalysis = z.infer<typeof feedbackAnalysisSchema>;
