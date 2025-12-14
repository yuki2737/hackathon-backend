import { IAuthRepository } from "../domain/IAuthRepository";
import { User } from "../domain/User";

/**
 * LoginUseCase
 * 認証は Firebase Auth 側で完了している前提。
 * ここでは「Firebase UID をもとにアプリ内 User を取得する」責務のみを持つ。
 */
export class LoginUseCase {
  constructor(private readonly userRepository: IAuthRepository) {}

  /**
   * @param uid Firebase Auth の UID
   */
  async execute(uid: string): Promise<User | null> {
    const user = await this.userRepository.findByUid(uid);
    return user;
  }
}
