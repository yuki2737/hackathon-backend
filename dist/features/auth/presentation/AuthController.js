"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const RegisterUseCase_1 = require("../application/RegisterUseCase");
const UserRepository_1 = require("../infrastructure/UserRepository");
class AuthController {
    async register(req, res) {
        try {
            const { uid, name, email, password } = req.body;
            const useCase = new RegisterUseCase_1.RegisterUseCase(new UserRepository_1.UserRepository());
            const user = await useCase.execute(uid, name, email, password);
            return res.status(201).json({
                message: "User registered & saved",
                user: {
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map