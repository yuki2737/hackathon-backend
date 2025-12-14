import { User } from "./User";

export interface IAuthRepository {
  findByUid(uid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
