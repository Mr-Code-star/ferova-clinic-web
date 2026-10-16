import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../application/auth-store';

/**
 * Guard that protects routes requiring authentication.
 * If the user is not signed in, redirects to the login page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isSignedIn()) {
    return true;
  }

  // Guarda la URL intentada para redirigir después del login (opcional)
  void router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
