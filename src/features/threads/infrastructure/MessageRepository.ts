import { PrismaClient, Prisma } from "@prisma/client";
import { IMessageRepository } from "../domain/IMessageRepository";
import { Message } from "../domain/Message";

const prisma = new PrismaClient();

export class MessageRepository implements IMessageRepository {
  async create(params: {
    threadId: number;
    senderId: number;
    content: string;
  }): Promise<Message> {
    const m = await prisma.message.create({ data: params });

    return new Message(m.id, m.threadId, m.senderId, m.content, m.createdAt);
  }

  async findByThread(threadId: number): Promise<
    {
      id: number;
      threadId: number;
      senderId: number;
      senderUid: string;
      content: string;
      createdAt: Date;
    }[]
  > {
    if (!threadId || Number.isNaN(threadId)) {
      throw new Error("Invalid threadId");
    }

    const messages = await prisma.message.findMany({
      where: { threadId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            uid: true,
          },
        },
      },
    });

    return messages.map(
      (m: {
        id: number;
        threadId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        sender: {
          uid: string;
        };
      }) => ({
        id: m.id,
        threadId: m.threadId,
        senderId: m.senderId,
        senderUid: m.sender.uid,
        content: m.content,
        createdAt: m.createdAt,
      })
    );
  }
}
