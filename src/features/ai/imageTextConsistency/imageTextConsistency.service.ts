// imageTextConsistency.service.ts
import fetch from "node-fetch";
import FormData from "form-data";

const AI_BASE_URL = "http://localhost:8000";

export async function checkImageTextConsistency(
  imageBuffer: Buffer,
  filename: string,
  description: string
) {
  const formData = new FormData();
  formData.append("image", imageBuffer, {
    filename,
    contentType: "image/jpeg",
  });
  formData.append("description", description);

  const res = await fetch(`${AI_BASE_URL}/ai/image-text-check`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("AI server error");
  }

  return res.json();
}
