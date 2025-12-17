import { Router, Request, Response } from "express";
import { AiController } from "./AiController";

const router = Router();
const controller = new AiController();

// 動作確認用
// GET /ai/ping
router.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

// POST /ai/generate-description
router.post(
  "/generate-description",
  controller.generateDescription.bind(controller)
);

export default router;
