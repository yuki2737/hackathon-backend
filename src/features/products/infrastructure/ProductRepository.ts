import { PrismaClient, $Enums } from "@prisma/client";
import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

const prisma = new PrismaClient();

export class ProductRepository implements IProductRepository {
  async findAll(keyword?: string, userId?: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          keyword
            ? {
                OR: [
                  { title: { contains: keyword, mode: "insensitive" } as any },
                  {
                    description: {
                      contains: keyword,
                      mode: "insensitive",
                    } as any,
                  },
                ],
              }
            : {},
          userId ? { userId: Number(userId) } : {},
        ],
      },
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
    const p = await prisma.product.findUnique({ where: { id } });
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
