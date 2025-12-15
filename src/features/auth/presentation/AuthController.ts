import { Request, Response } from "express";
import { RegisterUseCase } from "../application/RegisterUseCase";
import { UserRepository } from "../infrastructure/UserRepository";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { uid, name, email } = req.body;

      const useCase = new RegisterUseCase(new UserRepository());
      const user = await useCase.execute(uid, name, email);

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
      return res.status(200).json({
        message: "User already exists or registration skipped",
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { uid } = req.query;
      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      const repo = new UserRepository();
      let user = await repo.findByUid(String(uid));

      // 未登録の場合：自動登録（name / email があれば）
      if (!user) {
        const { name, email } = req.query;

        if (!name || !email) {
          return res.status(200).json({ user: null });
        }

        const useCase = new RegisterUseCase(repo);
        user = await useCase.execute(String(uid), String(name), String(email));
      }

      return res.status(200).json({
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
