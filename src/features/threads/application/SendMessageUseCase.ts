import { PrismaClient } from "@prisma/client";
import { IMessageRepository } from "../domain/IMessageRepository";

const prisma = new PrismaClient();

export class SendMessageUseCase {
  constructor(private messageRepo: IMessageRepository) {}

  async execute(params: {
    threadId: number;
    senderUid: string;
    content: string;
  }) {
    if (!params.content || !params.content.trim()) {
      throw new Error("メッセージ内容が空です");
    }

    const sender = await prisma.user.findUnique({
      where: { uid: params.senderUid },
    });

    if (!sender) {
      throw new Error("sender not found");
    }

    return this.messageRepo.create({
      threadId: params.threadId,
      senderId: sender.id,
      content: params.content,
    });
  }
}
