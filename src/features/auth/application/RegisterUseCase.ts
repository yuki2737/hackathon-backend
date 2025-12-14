import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";

export class RegisterUseCase {
  constructor(private readonly userRepository: IAuthRepository) {}

  async execute(uid: string, name: string, email: string): Promise<User> {
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
    const user = new User(0, uid, name, email);
    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
