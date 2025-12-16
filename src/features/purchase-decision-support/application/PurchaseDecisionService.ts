import {
  PurchaseDecisionInput,
  PurchaseDecisionResult,
} from "../domain/PurchaseDecisionResult";
import { IPurchaseDecisionService } from "../domain/IPurchaseDecisionService";

export class PurchaseDecisionService {
  constructor(private readonly aiService: IPurchaseDecisionService) {}

  async execute(input: PurchaseDecisionInput): Promise<PurchaseDecisionResult> {
    if (!input.title?.trim()) throw new Error("title is required");
    if (!input.category?.trim()) throw new Error("category is required");
    if (typeof input.price !== "number") throw new Error("price is invalid");
    if (!input.description?.trim()) throw new Error("description is required");

    const result = await this.aiService.evaluate(input);

    // 保険：良いポイントが空の場合でも必ず1つは返す
    if (!result.goodPoints || result.goodPoints.length === 0) {
      result.goodPoints = [
        "商品情報が一定の粒度で整理されており、判断材料として読み取りやすい点",
      ];
    }

    return result;
  }
}
