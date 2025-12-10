import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";
export declare class RegisterUseCase {
    private readonly userRepository;
    constructor(userRepository: IAuthRepository);
    execute(uid: string, name: string, email: string, password: string): Promise<User>;
}
//# sourceMappingURL=RegisterUseCase.d.ts.map