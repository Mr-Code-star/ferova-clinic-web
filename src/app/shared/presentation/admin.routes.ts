import { Routes } from '@angular/router';
import { AdminLayout } from './components/admin-layout/admin-layout';
import {
  FacilityDetailsView
} from '../../analytics-reporting/presentation/views/facility-details-view/facility-details-view';
import {
  RegisterFacilityView
} from '../../healthy-facility/presentation/views/register-facility-view/register-facility-view';

const adminHome = () =>
  import('./views/admin-home/admin-home').then((m) => m.AdminHome);
const adminMap = () =>
  import('./views/admin-map/admin-map').then((m) => m.AdminMap);

const adminPosts = () =>
  import('./views/admin-posts/admin-posts').then((m) => m.AdminPosts);
export const adminRoutes: Routes = [
  {
    path: 'facilities',
    component: FacilityDetailsView,
    title: 'Detalle de Postas | FerovaClinic'
  },
  {
    path: 'facilities/register',
    component: RegisterFacilityView,
    title: 'Nueva Posta | FerovaClinic'
  },
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
