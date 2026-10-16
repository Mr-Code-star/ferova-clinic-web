export class SignInCommand {
  private readonly _dni: string;
  private readonly _password: string;

  constructor(dni: string, password: string) {
    this._dni = dni;
    this._password = password;
  }

  get dni(): string { return this._dni; }
  get password(): string { return this._password; }
}
