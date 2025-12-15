"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const User_1 = require("../domain/User");
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(uid, name, email) {
        // ① uid で既存ユーザーを確認（最優先）
        const existingByUid = await this.userRepository.findByUid(uid);
        if (existingByUid) {
            return existingByUid;
        }
        // ② email で既存ユーザーを確認（Firebase再登録・再ログイン対策）
        const existingByEmail = await this.userRepository.findByEmail(email);
        if (existingByEmail) {
            return existingByEmail;
        }
        // ③ 新規作成
        const user = new User_1.User(0, uid, name, email);
        const newUser = await this.userRepository.create(user);
        return newUser;
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUseCase.js.map