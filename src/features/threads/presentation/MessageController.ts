import { Request, Response } from "express";
import { MessageRepository } from "../infrastructure/MessageRepository";
import { SendMessageUseCase } from "../application/SendMessageUseCase";
import { GetMessagesUseCase } from "../application/GetMessagesUseCase";

const messageRepo = new MessageRepository();

export class MessageController {
  async send(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      if (!threadId || Number.isNaN(threadId)) {
        return res.status(400).json({ error: "invalid threadId" });
      }
      const { senderUid, content } = req.body;

      const usecase = new SendMessageUseCase(messageRepo);
      const message = await usecase.execute({
        threadId,
        senderUid,
        content,
      });

      res.json({ message });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    const threadId = Number(req.params.id);
    if (!threadId || Number.isNaN(threadId)) {
      return res.status(400).json({ error: "invalid threadId" });
    }
    const usecase = new GetMessagesUseCase(messageRepo);
    const messages = await usecase.execute(threadId);
    res.json({ messages });
  }
}
