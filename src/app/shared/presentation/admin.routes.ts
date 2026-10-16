import { Routes } from '@angular/router';
import { AdminLayout } from './components/admin-layout/admin-layout';

const adminHome = () =>
  import('./views/admin-home/admin-home').then((m) => m.AdminHome);
const adminMap = () =>
  import('./views/admin-map/admin-map').then((m) => m.AdminMap);

const adminPosts = () =>
  import('./views/admin-posts/admin-posts').then((m) => m.AdminPosts);
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'home',
        loadComponent: adminHome,
        title: 'Inicio | FerovaClinic',
      },
      {
        path: 'map',
        loadComponent: adminMap,
        title: 'Mapa | FerovaClinic',
      },
      {
        path: 'posts',
        loadComponent: adminPosts,
        title: 'Postas | FerovaClinic',
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
