"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
/**
 * LoginUseCase
 * 認証は Firebase Auth 側で完了している前提。
 * ここでは「Firebase UID をもとにアプリ内 User を取得する」責務のみを持つ。
 */
class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * @param uid Firebase Auth の UID
     */
    async execute(uid) {
        const user = await this.userRepository.findByUid(uid);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map