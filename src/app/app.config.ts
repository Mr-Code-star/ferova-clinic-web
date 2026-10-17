import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { authInterceptor } from './iam/infrastructure/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
