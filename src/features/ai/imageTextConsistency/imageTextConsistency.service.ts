// src/features/ai/imageTextConsistency/imageTextConsistency.service.ts

import FormData from "form-data";
import fetch, { Response } from "node-fetch";
export interface ImageFinding {
  text: string;
  score: number;
}

export interface AnalysisResult {
  image_findings: ImageFinding[];
  text_similarity: number;
}

const PYTHON_AI_BASE_URL = process.env.PYTHON_AI_BASE_URL;

if (!PYTHON_AI_BASE_URL) {
  throw new Error("PYTHON_AI_BASE_URL is not set");
}

function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Request timed out after ${ms} ms`)),
      ms
    );

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function analyzeImageTextConsistency({
  buffer,
  filename,
  mimetype,
  description,
}: {
  buffer: Buffer;
  filename: string;
  mimetype: string;
  description: string;
}): Promise<AnalysisResult> {
  const form = new FormData();

  // ✅ Buffer をそのまま渡す（これが最重要）
  form.append("image", buffer, {
    filename,
    contentType: mimetype,
  });

  form.append("description", description);

  let res: Response;
  try {
    res = await timeoutPromise(
      fetch(`${PYTHON_AI_BASE_URL}/ai/image-text-consistency`, {
        method: "POST",
        body: form,
        // ✅ boundary を含む正しい multipart header
        headers: form.getHeaders(),
      }),
      15000
    );
  } catch (err) {
    throw new Error(
      `Failed to fetch from Python AI service: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Python AI error: ${text}`);
  }

  return res.json();
}
