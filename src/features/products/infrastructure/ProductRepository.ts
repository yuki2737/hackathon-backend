import { PrismaClient, $Enums, User } from "@prisma/client";
import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

const prisma = new PrismaClient();

export class ProductRepository implements IProductRepository {
  async findAll(keyword?: string, uid?: string): Promise<Product[]> {
    const where: any = {};

    // キーワード検索（独立）
    if (keyword) {
      where.OR = [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
      ];
    }

    // 出品一覧（キーワードが無い時だけ uid で絞り込み）
    if (!keyword && uid) {
      where.user = { uid };
    }

    const products = await prisma.product.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return products.map(
      (p) =>
        new Product(
          p.id,
          p.userId,
          p.category,
          p.title,
          p.description,
          p.price,
          p.imageUrl,
          p.status,
          p.createdAt,
          p.updatedAt
        )
    );
  }

  async findById(id: number): Promise<Product | null> {
    const p = await prisma.product.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!p) return null;

    return new Product(
      p.id,
      p.userId,
      p.category,
      p.title,
      p.description,
      p.price,
      p.imageUrl,
      p.status,
      p.createdAt,
      p.updatedAt
    );
  }

  async findUserByUid(uid: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { uid },
    });
  }

  async create(product: Product): Promise<Product> {
    const created = await prisma.product.create({
      data: {
        userId: product.userId,
        category: product.category as $Enums.Category,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        status: product.status as $Enums.Status,
      },
    });

    return new Product(
      created.id,
      created.userId,
      created.category,
      created.title,
      created.description,
      created.price,
      created.imageUrl,
      created.status,
      created.createdAt,
      created.updatedAt
    );
  }

  async update(data: {
    id: number;
    title?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    status?: string;
    category?: string;
  }): Promise<Product> {
    const updated = await prisma.product.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        status: data.status as any,
        category: data.category as any,
      },
    });
    return new Product(
      updated.id,
      updated.userId,
      updated.category,
      updated.title,
      updated.description,
      updated.price,
      updated.imageUrl,
      updated.status,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
