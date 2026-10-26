export class VerifyCodeCommand {
  private readonly _email: string;
  private readonly _code: string;

  constructor(email: string, code: string) {
    this._email = email;
    this._code = code;
  }

  get email(): string { return this._email; }
  get code(): string { return this._code; }
}
