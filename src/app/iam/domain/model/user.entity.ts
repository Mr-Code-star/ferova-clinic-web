export class User {
  constructor(
    public id: string | null,
    public name: string,
    public lastname: string,
    public email: string,
    public dni: string,
    public phone: string,
    public role: string
  ) {}

  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isNurse(): boolean {
    return this.role === 'Nurse';
  }
}
