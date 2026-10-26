import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../application/auth-store';

/**
 * Factory that creates a guard requiring a specific role.
 *
 * @example
 * { path: 'admin', canActivate: [authGuard, roleGuard('Admin')], ... }
 */
export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    // ¿Tiene el rol requerido?
    if (authStore.role() === requiredRole) {
      return true;
    }

    // Si está logueado pero con otro rol → a su home
    if (authStore.isSignedIn()) {
      const target = authStore.role() === 'Admin' ? '/admin/home' : '/nurse/home';
      void router.navigate([target]);
    } else {
      // No logueado → al login
      void router.navigate(['/auth/login']);
    }
    return false;
  };
}
