import { Storage } from "@google-cloud/storage";

const BUCKET_NAME = process.env.GCS_BUCKET_NAME;

export class GcsClient {
  private storage: Storage;
  private bucket;

  constructor() {
    if (!BUCKET_NAME) {
      throw new Error("GCS_BUCKET_NAME is not set");
    }
    // Use Application Default Credentials (ADC)
    // Local: gcloud auth application-default login
    // Cloud Run: attached service account
    this.storage = new Storage();
    this.bucket = this.storage.bucket(BUCKET_NAME);
  }

  async generateSignedUploadUrl(
    filePath: string,
    contentType: string
  ): Promise<{ uploadUrl: string; publicUrl: string }> {
    if (!filePath) {
      throw new Error("filePath is required");
    }
    if (!contentType) {
      throw new Error("contentType is required");
    }

    try {
      const file = this.bucket.file(filePath);

      const [uploadUrl] = await file.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
        contentType, // MUST match the PUT Content-Type exactly
      });

      const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${filePath}`;

      return { uploadUrl, publicUrl };
    } catch (err) {
      console.error("[GcsClient] Failed to generate signed upload URL", {
        filePath,
        contentType,
        error: err,
      });
      throw err;
    }
  }
}
