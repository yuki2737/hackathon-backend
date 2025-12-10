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
          uid: user.uid,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
