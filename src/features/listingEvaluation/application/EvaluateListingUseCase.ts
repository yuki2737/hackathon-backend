import { ListingEvaluationPrompt } from "./prompts/ListingEvaluationPrompt";
import {
  ListingEvaluationResult,
  RiskLevel,
} from "../domain/ListingEvaluationResult";
import { OpenAIListingEvaluationClient } from "../infrastructure/OpenAiListingEvaluationClient";

function extractJson(text: string): string {
  const trimmed = (text ?? "").trim();

  // たまに ```json ... ``` で返るケースもあるので救済
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) return fenced[1].trim();

  // 先頭が { から始まる想定。余計な文字が混ざったら最初の { から最後の } を拾う
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last >= 0 && last > first) {
    return trimmed.slice(first, last + 1);
  }

  return trimmed;
}

function normalizeResult(obj: any): ListingEvaluationResult {
  const missingInfo = Array.isArray(obj?.missingInfo)
    ? obj.missingInfo.map(String)
    : [];

  const ambiguousExpressions = Array.isArray(obj?.ambiguousExpressions)
    ? obj.ambiguousExpressions.map(String)
    : [];

  const riskLevelRaw = String(obj?.riskLevel ?? "").toLowerCase();
  const riskLevel: RiskLevel =
    riskLevelRaw === "low" ||
    riskLevelRaw === "medium" ||
    riskLevelRaw === "high"
      ? (riskLevelRaw as RiskLevel)
      : "medium";

  return { missingInfo, ambiguousExpressions, riskLevel };
}

export class EvaluateListingUseCase {
  constructor(private readonly aiClient: OpenAIListingEvaluationClient) {}

  async execute(input: {
    title: string;
    category?: string;
    price: number;
    description: string;
  }): Promise<ListingEvaluationResult> {
    const prompt = new ListingEvaluationPrompt(input);
    const raw = await this.aiClient.evaluate(prompt.toPromptText());

    const jsonText = extractJson(raw);

    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }

    return normalizeResult(parsed);
  }
}
