import OpenAI from "openai";
import { IPurchaseDecisionService } from "../domain/IPurchaseDecisionService";
import {
  PurchaseDecisionInput,
  PurchaseDecisionResult,
} from "../domain/PurchaseDecisionResult";
import { buildPurchaseDecisionPrompt } from "../application/prompts/purchaseDecisionPrompt";

export class OpenAiPurchaseDecisionService implements IPurchaseDecisionService {
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    this.client = new OpenAI({ apiKey });
  }

  async evaluate(
    input: PurchaseDecisionInput
  ): Promise<PurchaseDecisionResult> {
    const prompt = buildPurchaseDecisionPrompt(input);

    const res = await this.client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You must output valid JSON only." },
        { role: "user", content: prompt },
      ],
    });

    const content = res.choices[0]?.message?.content;
    if (!content) throw new Error("Empty OpenAI response");

    const parsed = JSON.parse(content);
    return this.normalize(parsed);
  }

  private normalize(raw: any): PurchaseDecisionResult {
    return {
      goodPoints: Array.isArray(raw.goodPoints)
        ? raw.goodPoints.filter(Boolean)
        : [],
      decisionPoints: Array.isArray(raw.decisionPoints)
        ? raw.decisionPoints.filter(Boolean)
        : [],
      ambiguousPoints: Array.isArray(raw.ambiguousPoints)
        ? raw.ambiguousPoints.filter(Boolean)
        : [],
    };
  }
}
