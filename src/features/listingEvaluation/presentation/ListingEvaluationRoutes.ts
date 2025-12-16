import { Router } from "express";
import { OpenAIListingEvaluationClient } from "../infrastructure/OpenAiListingEvaluationClient";
import { EvaluateListingUseCase } from "../application/EvaluateListingUseCase";
import { ListingEvaluationController } from "./ListingEvaluationController";

const router = Router();

const aiClient = new OpenAIListingEvaluationClient(
  process.env.OPENAI_API_KEY || ""
);
const useCase = new EvaluateListingUseCase(aiClient);
const controller = new ListingEvaluationController(useCase);

router.post("/ai/listing-evaluation", (req, res) =>
  controller.evaluate(req, res)
);

export default router;
