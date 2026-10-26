export class SignUpCommand {
  private readonly _name: string;
  private readonly _lastName: string;
  private readonly _password: string;
  private readonly _email: string;
  private readonly _dni: string;
  private readonly _phone: string;
  private readonly _role: string;

  constructor(
    name: string, lastName: string, password: string, email: string,
    dni: string, phone: string, role: string
  ) {
    this._name = name;
    this._lastName = lastName;
    this._password = password;
    this._email = email;
    this._dni = dni;
    this._phone = phone;
    this._role = role;
  }

  get name() { return this._name; }
  get lastName() { return this._lastName; }
  get password() { return this._password; }
  get email() { return this._email; }
  get dni() { return this._dni; }
  get phone() { return this._phone; }
  get role() { return this._role; }
}
