import { Routes } from '@angular/router';

const iamRoutes = () => import('./iam/presentation/iam.routes').then((m) => m.iamRoutes);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const baseTitle = 'FerovaClinic'

export const routes: Routes = [

  // IAM (login, register, password recovery)
  {
    path: 'auth',
    loadChildren: iamRoutes,
  },

  // Redirecciones
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `Página no encontrada | ${baseTitle}` },
];
