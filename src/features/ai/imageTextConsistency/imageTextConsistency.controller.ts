// imageTextConsistency.controller.ts
import { Request, Response } from "express";
import { checkImageTextConsistency } from "./imageTextConsistency.service";

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

    const result = await checkImageTextConsistency(
      file.buffer,
      file.originalname,
      description
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI server communication failed" });
  }
}
