"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const User_1 = require("../domain/User");
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(uid, name, email) {
        // 既存メールがあるか確認
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
        // Userドメイン作成（3引数）
        const user = new User_1.User(0, uid, name, email);
        // DB保存
        const newUser = await this.userRepository.create(user);
        return newUser;
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUseCase.js.map