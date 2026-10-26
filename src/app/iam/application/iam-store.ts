import { computed, inject, Injectable, signal, Signal } from '@angular/core';

import { User } from '../domain/model/user.entity';
import { IamApi } from '../infrastructure/iam-api';
import { UserResource } from '../infrastructure/users-response';

@Injectable({ providedIn: 'root' })
export class IamStore {

  private readonly iamApi = inject(IamApi);

  // ============================================
  // ESTADO
  // ============================================
  /** Usuario logueado actual. */
  private readonly currentUserSignal = signal<User | null>(null);

  /** API pública: signal readonly del usuario. */
  readonly currentUser = this.currentUserSignal.asReadonly();

  /** API pública: fullName derivado del usuario. */
  readonly fullName = computed(() => {
    const user = this.currentUserSignal();
    return user ? `${user.name} ${user.lastname}`.trim() : null;
  });

  /** API pública: rol del usuario. */
  readonly role = computed(() => this.currentUserSignal()?.role ?? null);

  // ============================================
  // CARGAR USUARIO LOGUEADO
  // ============================================
  /**
   * Carga el usuario logueado desde el backend por id.
   * Guarda el usuario en el estado interno.
   */
  loadCurrentUser(id: string): void {
    this.iamApi.getUserById(id).subscribe({
      next: (resource) => {
        const user = this.mapToUser(resource);
        this.currentUserSignal.set(user);
        console.log('✅ IamStore: usuario cargado', user);
      },
      error: (err) => {
        console.error('❌ IamStore: error al cargar usuario', err);
        this.currentUserSignal.set(null);
      },
    });
  }

  // ============================================
  // HELPERS
  // ============================================
  private mapToUser(resource: UserResource): User {
    return new User(
      resource.id,
      resource.name,
      resource.lastname,
      resource.email,
      resource.dni,
      resource.phone,
      resource.role,
    );
  }

  /**
   * Limpia el estado (llamar en logout).
   */
  clear(): void {
    this.currentUserSignal.set(null);
  }
}
