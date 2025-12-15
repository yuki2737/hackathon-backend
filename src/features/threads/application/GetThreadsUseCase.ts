import { IThreadRepository } from "../domain/IThreadRepository";

export class GetThreadsUseCase {
  constructor(private threadRepo: IThreadRepository) {}

  async execute(userId: number) {
    return this.threadRepo.findByUserId(userId);
  }
}
