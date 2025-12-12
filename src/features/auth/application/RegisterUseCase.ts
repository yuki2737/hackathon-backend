import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";
import { hashPassword } from "../../../core/utils/crypto";

export class RegisterUseCase {
  constructor(private readonly userRepository: IAuthRepository) {}

  async execute(
    uid: string,
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    // 既存メールがあるか確認
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(password);

    // Userドメイン作成（3引数）
    const user = new User(0, uid, name, email);

    // DB保存
    const newUser = await this.userRepository.create(user, hashedPassword);

    return newUser;
  }
}
