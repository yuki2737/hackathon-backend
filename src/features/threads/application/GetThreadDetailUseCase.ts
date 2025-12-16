import { IThreadRepository } from "../domain/IThreadRepository";

export class GetThreadDetailUseCase {
  constructor(private threadRepo: IThreadRepository) {}
  async execute(id: number) {
    return this.threadRepo.findById(id);
  }
}
