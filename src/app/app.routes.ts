import { Routes } from '@angular/router';

const iamRoutes = () =>
  import('./iam/presentation/iam.routes').then((m) => m.iamRoutes);

const adminRoutes = () =>
  import('./shared/presentation/admin.routes').then((m) => m.adminRoutes);

const nurseRoutes = () =>
  import('./shared/presentation/nurse.routes').then((m) => m.nurseRoutes);


const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'FerovaClinic'

export const routes: Routes = [

  // IAM (login, register, password recovery)
  {
    path: 'auth',
    loadChildren: iamRoutes,
  },
  {
    path: 'admin',
    loadChildren: adminRoutes,
  },
  {
    path: 'nurse',
    loadChildren: nurseRoutes,
  },
  // Redirecciones
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `Página no encontrada | ${baseTitle}` },
];
