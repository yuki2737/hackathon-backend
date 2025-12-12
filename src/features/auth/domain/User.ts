export class User {
  constructor(
    public id: number, // DB 内の User.id
    public uid: string, // Firebase UID
    public name: string,
    public email: string,
    public password?: string
  ) {}
}
