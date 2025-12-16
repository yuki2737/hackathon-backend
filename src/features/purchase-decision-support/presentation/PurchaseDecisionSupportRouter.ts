import { Router } from "express";
import { OpenAiPurchaseDecisionService } from "../infrastructure/OpenAiPurchaseDecisionService";
import { PurchaseDecisionService } from "../application/PurchaseDecisionService";
import { PurchaseDecisionController } from "./PurchaseDecisionController";

export const purchaseDecisionSupportRouter = () => {
  const router = Router();

  const aiService = new OpenAiPurchaseDecisionService(
    process.env.OPENAI_API_KEY || ""
  );
  const service = new PurchaseDecisionService(aiService);
  const controller = new PurchaseDecisionController(service);

  router.post(
    "/ai/purchase-decision-support",
    controller.evaluate.bind(controller)
  );

  return router;
};
