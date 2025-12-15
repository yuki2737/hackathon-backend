import { Router } from "express";
import { ImageController } from "./ImageController";

const router = Router();

router.post("/upload-url", ImageController.generateUploadUrl);

export default router;
