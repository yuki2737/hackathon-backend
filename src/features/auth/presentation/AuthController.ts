import { Request, Response } from "express";
import { RegisterUseCase } from "../application/RegisterUseCase";
import { UserRepository } from "../infrastructure/UserRepository";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { uid, name, email, password } = req.body;

      const useCase = new RegisterUseCase(new UserRepository());
      const user = await useCase.execute(uid, name, email, password);

      return res.status(201).json({
        message: "User registered & saved",
        user: {
          id: user.id,
          uid: user.uid,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { uid } = req.query;
      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      const repo = new UserRepository();
      const user = await repo.findByUid(String(uid));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({
        id: user.id,
        uid: user.uid,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
