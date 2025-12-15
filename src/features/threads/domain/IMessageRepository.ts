import { Message } from "./Message";

export interface IMessageRepository {
  create(params: {
    threadId: number;
    senderId: number;
    content: string;
  }): Promise<Message>;

  findByThread(threadId: number): Promise<Message[]>;
}
