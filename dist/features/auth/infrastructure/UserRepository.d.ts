import { User } from "../domain/User";
import { IAuthRepository } from "../domain/IAuthRepository";
export declare class UserRepository implements IAuthRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: User, hashedPassword: string): Promise<User>;
}
//# sourceMappingURL=UserRepository.d.ts.map