export class Product {
  constructor(
    public id: number,
    public userId: number,
    public category: string,
    public title: string,
    public description: string | null,
    public price: number,
    public imageUrl: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
