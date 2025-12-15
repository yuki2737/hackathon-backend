import { GcsClient } from "../infrastructure/GcsClient";

export class GenerateUploadUrlUseCase {
  constructor(private gcsClient: GcsClient) {}

  async execute(input: { fileName: string; contentType: string; uid: string }) {
    const ext = input.fileName.split(".").pop();
    const filePath = `products/${input.uid}/${Date.now()}.${ext}`;

    return await this.gcsClient.generateSignedUploadUrl(
      filePath,
      input.contentType
    );
  }
}
