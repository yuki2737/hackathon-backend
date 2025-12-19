import { PrismaClient, Prisma } from "@prisma/client";
import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

const prisma = new PrismaClient();

export class ProductRepository implements IProductRepository {
  async findAll(params: {
    uid?: string;
    keyword?: string;
    category?: string;
    subCategory?: string[]; // ← 配列に変更
    minPrice?: number;
    maxPrice?: number;
    sort?: "price_asc" | "price_desc";
  }): Promise<Product[]> {
    const where: any = {};
    const andConditions: any[] = [];

    if (params.keyword) {
      andConditions.push({
        OR: [
          { title: { contains: params.keyword } },
          { description: { contains: params.keyword } },
        ],
      });
    }

    // ===== category（AND）=====
    if (params.category) {
      andConditions.push({
        category: params.category as any,
      });
    }

    // ===== subCategory（複数選択 / OR）=====
    if (params.subCategory && params.subCategory.length > 0) {
      const subCategoryConditions: any[] = [];

      const fieldMap: Record<string, string> = {
        fashion: "fashionSubCategory",
        electronics: "electronicsSubCategory",
        book: "bookSubCategory",
        hobby: "hobbySubCategory",
        sports: "sportsSubCategory",
        beauty: "beautySubCategory",
        lifestyle: "lifestyleSubCategory",
        handmade: "handmadeSubCategory",
        kids: "kidsSubCategory",
        pet: "petSubCategory",
        food: "foodSubCategory",
        other: "otherSubCategory",
      };

      if (params.category) {
        const field = fieldMap[params.category];
        if (field) {
          subCategoryConditions.push({
            [field]: { in: params.subCategory },
          });
        }
      } else {
        Object.values(fieldMap).forEach((field) => {
          subCategoryConditions.push({
            [field]: { in: params.subCategory },
          });
        });
      }

      if (subCategoryConditions.length > 0) {
        andConditions.push({
          OR: subCategoryConditions,
        });
      }
    }

    if (params.minPrice !== undefined) {
      andConditions.push({
        price: { gte: Number(params.minPrice) },
      });
    }

    if (params.maxPrice !== undefined) {
      andConditions.push({
        price: { lte: Number(params.maxPrice) },
      });
    }

    if (params.uid) {
      andConditions.push({ user: { uid: params.uid } });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput;
    if (params.sort === "price_asc") {
      orderBy = { price: Prisma.SortOrder.asc };
    } else if (params.sort === "price_desc") {
      orderBy = { price: Prisma.SortOrder.desc };
    } else {
      orderBy = { createdAt: Prisma.SortOrder.desc };
    }

    const products = await prisma.product.findMany({
      where,
      include: { user: true },
      orderBy,
    });

    return products.map((p: any) => {
      const subCategory =
        p.fashionSubCategory ??
        p.electronicsSubCategory ??
        p.bookSubCategory ??
        p.hobbySubCategory ??
        p.sportsSubCategory ??
        p.beautySubCategory ??
        p.lifestyleSubCategory ??
        p.handmadeSubCategory ??
        p.kidsSubCategory ??
        p.petSubCategory ??
        p.foodSubCategory ??
        p.otherSubCategory ??
        null;
      return new Product(
        p.id,
        p.userId,
        p.category as any,
        subCategory,
        p.title,
        p.description,
        p.price,
        p.imageUrl ?? "",
        p.status as any,
        p.createdAt,
        p.updatedAt
      );
    });
  }

  async findById(id: number): Promise<Product | null> {
    const p = await prisma.product.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!p) return null;

    const subCategory =
      p.fashionSubCategory ??
      p.electronicsSubCategory ??
      p.bookSubCategory ??
      p.hobbySubCategory ??
      p.sportsSubCategory ??
      p.beautySubCategory ??
      p.lifestyleSubCategory ??
      p.handmadeSubCategory ??
      p.kidsSubCategory ??
      p.petSubCategory ??
      p.foodSubCategory ??
      p.otherSubCategory ??
      null;
    const product = new Product(
      p.id,
      p.userId,
      p.category as any,
      subCategory,
      p.title,
      p.description,
      p.price,
      p.imageUrl ?? "",
      p.status as any,
      p.createdAt,
      p.updatedAt
    ) as any;

    // 出品者情報をAPIレスポンスに含める
    product.user = p.user;

    return product;
  }

  async findUserByUid(uid: string): Promise<any | null> {
    return await prisma.user.findUnique({
      where: { uid },
    });
  }

  async create(
    product: Product & { subCategory?: string | null }
  ): Promise<Product> {
    const subCategoryData: any = {};

    switch (product.category) {
      case "fashion":
        subCategoryData.fashionSubCategory = product.subCategory;
        break;
      case "electronics":
        subCategoryData.electronicsSubCategory = product.subCategory;
        break;
      case "book":
        subCategoryData.bookSubCategory = product.subCategory;
        break;
      case "hobby":
        subCategoryData.hobbySubCategory = product.subCategory;
        break;
      case "sports":
        subCategoryData.sportsSubCategory = product.subCategory;
        break;
      case "beauty":
        subCategoryData.beautySubCategory = product.subCategory;
        break;
      case "lifestyle":
        subCategoryData.lifestyleSubCategory = product.subCategory;
        break;
      case "handmade":
        subCategoryData.handmadeSubCategory = product.subCategory;
        break;
      case "kids":
        subCategoryData.kidsSubCategory = product.subCategory;
        break;
      case "pet":
        subCategoryData.petSubCategory = product.subCategory;
        break;
      case "food":
        subCategoryData.foodSubCategory = product.subCategory;
        break;
      case "other":
        subCategoryData.otherSubCategory = product.subCategory;
        break;
    }

    const created = await prisma.product.create({
      data: {
        userId: product.userId,
        category: product.category as any,
        ...subCategoryData,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl ?? null,
        status: product.status as any,
      },
    });

    const subCategory =
      created.fashionSubCategory ??
      created.electronicsSubCategory ??
      created.bookSubCategory ??
      created.hobbySubCategory ??
      created.sportsSubCategory ??
      created.beautySubCategory ??
      created.lifestyleSubCategory ??
      created.handmadeSubCategory ??
      created.kidsSubCategory ??
      created.petSubCategory ??
      created.foodSubCategory ??
      created.otherSubCategory ??
      null;
    return new Product(
      created.id,
      created.userId,
      created.category as any,
      subCategory,
      created.title,
      created.description,
      created.price,
      created.imageUrl ?? "",
      created.status as any,
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
    subCategory?: string | null;
  }): Promise<Product> {
    // 現在の状態を取得（category が未指定でも subCategory を更新できるようにするため）
    const current = await prisma.product.findUnique({
      where: { id: data.id },
      select: { category: true },
    });

    if (!current) {
      throw new Error("Product not found");
    }

    // 今回の更新後に採用される category（未指定なら現状維持）
    const targetCategory = (data.category ??
      (current.category as any)) as string;

    // サブカテゴリの保存先カラムを作る
    const subCategoryData: any = {};

    // category を変更する場合は、古いカテゴリの subCategory カラムを残さないよう全てクリア
    // （カテゴリ移動時に別カテゴリの subCategory が残ると取得ロジックで誤検知しやすい）
    if (data.category && data.category !== (current.category as any)) {
      subCategoryData.fashionSubCategory = null;
      subCategoryData.electronicsSubCategory = null;
      subCategoryData.bookSubCategory = null;
      subCategoryData.hobbySubCategory = null;
      subCategoryData.sportsSubCategory = null;
      subCategoryData.beautySubCategory = null;
      subCategoryData.lifestyleSubCategory = null;
      subCategoryData.handmadeSubCategory = null;
      subCategoryData.kidsSubCategory = null;
      subCategoryData.petSubCategory = null;
      subCategoryData.foodSubCategory = null;
      subCategoryData.otherSubCategory = null;
    }

    // subCategory が「送られてきた時だけ」反映する（undefined は未変更の意味）
    if (data.subCategory !== undefined) {
      switch (targetCategory) {
        case "fashion":
          subCategoryData.fashionSubCategory = data.subCategory;
          break;
        case "electronics":
          subCategoryData.electronicsSubCategory = data.subCategory;
          break;
        case "book":
          subCategoryData.bookSubCategory = data.subCategory;
          break;
        case "hobby":
          subCategoryData.hobbySubCategory = data.subCategory;
          break;
        case "sports":
          subCategoryData.sportsSubCategory = data.subCategory;
          break;
        case "beauty":
          subCategoryData.beautySubCategory = data.subCategory;
          break;
        case "lifestyle":
          subCategoryData.lifestyleSubCategory = data.subCategory;
          break;
        case "handmade":
          subCategoryData.handmadeSubCategory = data.subCategory;
          break;
        case "kids":
          subCategoryData.kidsSubCategory = data.subCategory;
          break;
        case "pet":
          subCategoryData.petSubCategory = data.subCategory;
          break;
        case "food":
          subCategoryData.foodSubCategory = data.subCategory;
          break;
        case "other":
          subCategoryData.otherSubCategory = data.subCategory;
          break;
      }
    }

    const updated = await prisma.product.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        status: data.status as any,
        // category は未指定なら更新しない（undefined のまま）
        category: data.category as any,
        ...subCategoryData,
      },
    });

    const subCategory =
      updated.fashionSubCategory ??
      updated.electronicsSubCategory ??
      updated.bookSubCategory ??
      updated.hobbySubCategory ??
      updated.sportsSubCategory ??
      updated.beautySubCategory ??
      updated.lifestyleSubCategory ??
      updated.handmadeSubCategory ??
      updated.kidsSubCategory ??
      updated.petSubCategory ??
      updated.foodSubCategory ??
      updated.otherSubCategory ??
      null;

    return new Product(
      updated.id,
      updated.userId,
      updated.category as any,
      subCategory,
      updated.title,
      updated.description,
      updated.price,
      updated.imageUrl ?? "",
      updated.status as any,
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
