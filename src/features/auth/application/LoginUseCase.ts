import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";
import { comparePassword } from "../../../core/utils/crypto";

export class LoginUseCase {
  constructor(private readonly userRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    // メールでユーザー検索
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // パスワード照合
    const isValid = await comparePassword(password, user.password!);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    // ログイン成功 → User(id, uid, name, email) を返す
    return new User(user.id, user.uid, user.name, user.email);
  }
}
