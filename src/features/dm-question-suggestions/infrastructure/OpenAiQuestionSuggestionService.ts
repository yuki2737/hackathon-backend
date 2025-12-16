import OpenAI from "openai";
import { IQuestionSuggestionService } from "../domain/IQuestionSuggestionService";
import { QuestionSuggestionInput } from "../domain/QuestionSuggestionInput";
import { QuestionSuggestionResult } from "../domain/QuestionSuggestionResult";
import { DmQuestionSuggestionPrompt } from "../application/prompts/DmQuestionSuggestionPrompt";

export class OpenAiQuestionSuggestionService
  implements IQuestionSuggestionService
{
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    this.client = new OpenAI({ apiKey });
  }

  async generate(
    input: QuestionSuggestionInput
  ): Promise<QuestionSuggestionResult> {
    const prompt = DmQuestionSuggestionPrompt.build(input);

    const res = await this.client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You must output valid JSON only." },
        { role: "user", content: prompt },
      ],
    });

    const content = res.choices[0]?.message?.content;
    if (!content) throw new Error("Empty OpenAI response");

    const parsed = JSON.parse(content);

    return {
      questionSuggestions: Array.isArray(parsed.questionSuggestions)
        ? parsed.questionSuggestions.filter(Boolean).slice(0, 3)
        : [],
    };
  }
}
