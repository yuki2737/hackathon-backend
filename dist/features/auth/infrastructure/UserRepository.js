"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const User_1 = require("../domain/User");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            return null;
        return new User_1.User(user.uid, user.name, user.email);
    }
    async create(user, hashedPassword) {
        const created = await prisma.user.create({
            data: {
                uid: user.uid,
                name: user.name,
                email: user.email,
                password: hashedPassword,
            },
        });
        return new User_1.User(created.uid, created.name, created.email);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map