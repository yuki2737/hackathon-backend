import { Request, Response } from "express";
export declare class ProductController {
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=ProductController.d.ts.map