import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";
/**
 * LoginUseCase
 * 認証は Firebase Auth 側で完了している前提。
 * ここでは「Firebase UID をもとにアプリ内 User を取得する」責務のみを持つ。
 */
export declare class LoginUseCase {
    private readonly userRepository;
    constructor(userRepository: IAuthRepository);
    /**
     * @param uid Firebase Auth の UID
     */
    execute(uid: string): Promise<User | null>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map