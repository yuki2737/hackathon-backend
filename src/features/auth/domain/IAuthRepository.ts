import { User } from "./User";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User, hashedPassword: string): Promise<User>;
}
