import OpenAI from "openai";
import { IDmAnswerSuggestionService } from "../domain/IDmAnswerSuggestionService";
import {
  DmAnswerSuggestionInput,
  DmAnswerSuggestionResult,
} from "../domain/DmAnswerSuggestionResult";
import { buildDmAnswerSuggestionPrompt } from "../application/prompts/dmAnswerSuggestionPrompt";

export class OpenAiDmAnswerSuggestionService
  implements IDmAnswerSuggestionService
{
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    this.client = new OpenAI({ apiKey });
  }

  async generate(
    input: DmAnswerSuggestionInput
  ): Promise<DmAnswerSuggestionResult> {
    const prompt = buildDmAnswerSuggestionPrompt(input);

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
      answerSuggestions: Array.isArray(parsed.answerSuggestions)
        ? parsed.answerSuggestions.filter(Boolean).slice(0, 3)
        : [],
    };
  }
}
