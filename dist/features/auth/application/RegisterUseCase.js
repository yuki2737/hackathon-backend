"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const User_1 = require("../domain/User");
const crypto_1 = require("../../../core/utils/crypto");
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(uid, name, email, password) {
        // 既存メールがあるか確認
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
        // パスワードをハッシュ化
        const hashedPassword = await (0, crypto_1.hashPassword)(password);
        // Userドメイン作成（3引数）
        const user = new User_1.User(uid, name, email);
        // DB保存
        const newUser = await this.userRepository.create(user, hashedPassword);
        return newUser;
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUseCase.js.map