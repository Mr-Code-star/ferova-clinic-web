import { computed, Injectable, signal, Signal } from '@angular/core';
import { User } from '../domain/model/user.entity';

@Injectable({ providedIn: 'root' })
export class IamStore {

  private readonly userSignal = signal<User[]>([]);

  private readonly users = this.userSignal.asReadonly();

  getUserById(id: string | null | undefined): Signal<User | undefined> {
      return computed(() => id
        ? this.users().find(user => user.id === id) : undefined);
  }

  getUserByEmail(email: string | null | undefined): Signal<User | undefined> {
    return computed(() => email
      ? this.users().find(user => user.email === email) : undefined);
  }

}
