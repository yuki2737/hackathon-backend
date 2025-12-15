"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const RegisterUseCase_1 = require("../application/RegisterUseCase");
const UserRepository_1 = require("../infrastructure/UserRepository");
class AuthController {
    async register(req, res) {
        try {
            const { uid, name, email } = req.body;
            const useCase = new RegisterUseCase_1.RegisterUseCase(new UserRepository_1.UserRepository());
            const user = await useCase.execute(uid, name, email);
            return res.status(201).json({
                message: "User registered & saved",
                user: {
                    id: user.id,
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (error) {
            return res.status(200).json({
                message: "User already exists or registration skipped",
            });
        }
    }
    async getUser(req, res) {
        try {
            const { uid } = req.query;
            if (!uid) {
                return res.status(400).json({ error: "uid is required" });
            }
            const repo = new UserRepository_1.UserRepository();
            let user = await repo.findByUid(String(uid));
            // 未登録の場合：自動登録（name / email があれば）
            if (!user) {
                const { name, email } = req.query;
                if (!name || !email) {
                    return res.status(200).json({ user: null });
                }
                const useCase = new RegisterUseCase_1.RegisterUseCase(repo);
                user = await useCase.execute(String(uid), String(name), String(email));
            }
            return res.status(200).json({
                id: user.id,
                uid: user.uid,
                name: user.name,
                email: user.email,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map