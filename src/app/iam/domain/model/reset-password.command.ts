export class ResetPasswordCommand {
  private readonly _email: string;
  private readonly _code: string;
  private readonly _newPassword: string;

  constructor(email: string, code: string, newPassword: string) {
    this._email = email;
    this._code = code;
    this._newPassword = newPassword;
  }

  get email(): string { return this._email; }
  get code(): string { return this._code; }
  get newPassword(): string { return this._newPassword; }
}
