import { User } from "./User";

export interface IAuthRepository {
  findByUid(buyerUid: string): unknown;
  findByEmail(email: string): Promise<User | null>;
  create(user: User, hashedPassword: string): Promise<User>;
}
