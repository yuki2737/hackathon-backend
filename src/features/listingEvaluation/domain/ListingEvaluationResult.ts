export type RiskLevel = "low" | "medium" | "high";

export type ListingEvaluationResult = {
  missingInfo: string[];
  ambiguousExpressions: string[];
  riskLevel: RiskLevel;
};
