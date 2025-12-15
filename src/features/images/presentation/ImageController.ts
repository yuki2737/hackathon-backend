import { Request, Response } from "express";
import { GenerateUploadUrlUseCase } from "../application/GenerateUploadUrlUseCase";
import { GcsClient } from "../infrastructure/GcsClient";

export class ImageController {
  static async generateUploadUrl(req: Request, res: Response) {
    try {
      const { fileName, contentType, uid } = req.body;

      if (!fileName || !contentType || !uid) {
        return res.status(400).json({
          error: "fileName, contentType, uid are required",
        });
      }

      const useCase = new GenerateUploadUrlUseCase(new GcsClient());
      const result = await useCase.execute({ fileName, contentType, uid });

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate upload url" });
    }
  }
}
