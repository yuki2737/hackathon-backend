// src/features/ai/imageTextConsistency/imageTextConsistency.router.ts

import { Router } from "express";
import multer from "multer";
import { imageTextConsistencyController } from "./imageTextConsistency.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/ai/image-text-consistency",
  upload.single("image"),
  imageTextConsistencyController
);

export default router;
