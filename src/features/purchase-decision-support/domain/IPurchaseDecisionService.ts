import {
  PurchaseDecisionInput,
  PurchaseDecisionResult,
} from "./PurchaseDecisionResult";

export interface IPurchaseDecisionService {
  evaluate(input: PurchaseDecisionInput): Promise<PurchaseDecisionResult>;
}
