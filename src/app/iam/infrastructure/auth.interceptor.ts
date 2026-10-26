import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Buscamos el token que guardaste en el login
  const token = localStorage.getItem('ferova_token');

  // Si no hay token, dejamos pasar la petición tal cual
  if (!token) {
    return next(req);
  }

  // Si hay token, clonamos la petición y le añadimos el header Authorization
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
};
