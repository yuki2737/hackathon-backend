import { PrismaClient } from "@prisma/client";
import { User } from "../domain/User";
import { IAuthRepository } from "../domain/IAuthRepository";

const prisma = new PrismaClient();

export class UserRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user.uid!, user.name, user.email);
  }

  async create(user: User, hashedPassword: string): Promise<User> {
    const created = await prisma.user.create({
      data: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    return new User(created.uid!, created.name, created.email);
  }
}
