export class Message {
  constructor(
    public readonly id: number,
    public readonly threadId: number,
    public readonly senderId: number,
    public readonly content: string,
    public readonly createdAt: Date
  ) {}
}
