// src/features/ai/imageTextConsistency/imageTextConsistency.controller.ts

import { Request, Response } from "express";
import { analyzeImageTextConsistency } from "./imageTextConsistency.service";

export async function imageTextConsistencyController(
  req: Request,
  res: Response
) {
  try {
    const file = req.file;
    const { description } = req.body;

    if (!file) {
      return res.status(400).json({ message: "image is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is required" });
    }

    const result = await analyzeImageTextConsistency({
      buffer: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
      description,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI server communication failed" });
  }
}
