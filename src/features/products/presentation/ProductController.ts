import { Request, Response } from "express";
import { ProductRepository } from "../infrastructure/ProductRepository";
import { ListProductsUseCase } from "../application/ListProductsUseCase";
import { GetProductDetailUseCase } from "../application/GetProductDetailUseCase";
import { CreateProductUseCase } from "../application/CreateProductUseCase";

export class ProductController {
  async list(req: Request, res: Response) {
    try {
      const useCase = new ListProductsUseCase(new ProductRepository());
      const { uid, keyword, category, subCategory, minPrice, maxPrice, sort } =
        req.query;

      const uidParam = typeof uid === "string" ? uid : undefined;
      const keywordParam = typeof keyword === "string" ? keyword : undefined;
      const categoryParam = typeof category === "string" ? category : undefined;
      const subCategoryParam = Array.isArray(subCategory)
        ? subCategory.filter((v): v is string => typeof v === "string")
        : typeof subCategory === "string"
        ? [subCategory]
        : undefined;
      const minPriceParam =
        typeof minPrice === "string" ? Number(minPrice) : undefined;
      const maxPriceParam =
        typeof maxPrice === "string" ? Number(maxPrice) : undefined;

      const sortParam =
        sort === "price_asc" || sort === "price_desc" ? sort : undefined;

      const products = await useCase.execute({
        uid: uidParam,
        keyword: keywordParam,
        category: categoryParam,
        subCategory: subCategoryParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        sort: sortParam,
      });

      return res.json({ message: "Products fetched successfully", products });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const useCase = new GetProductDetailUseCase(new ProductRepository());
      const product = await useCase.execute(Number(req.params.id));

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({
        message: "Product detail fetched successfully",
        product,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        uid,
        category,
        subCategory,
        title,
        description,
        price,
        imageUrl,
        status,
      } = req.body;

      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      const useCase = new CreateProductUseCase(new ProductRepository());
      const product = await useCase.execute({
        uid,
        category,
        subCategory,
        title,
        description,
        price,
        imageUrl,
        status: status as any,
      });

      return res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const {
        category,
        subCategory,
        title,
        description,
        price,
        imageUrl,
        status,
      } = req.body;

      const repository = new ProductRepository();
      const product = await repository.update({
        id,
        category,
        subCategory,
        title,
        description,
        price,
        imageUrl,
        status,
      });

      return res.json({
        message: "Product updated successfully",
        product,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const repository = new ProductRepository();
      await repository.delete(id);

      return res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
