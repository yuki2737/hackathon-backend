import { IMessageRepository } from "../domain/IMessageRepository";

export class GetMessagesUseCase {
  constructor(private messageRepo: IMessageRepository) {}

  async execute(threadId: number) {
    return this.messageRepo.findByThread(threadId);
  }
}
