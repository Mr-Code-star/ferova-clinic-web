import { Routes } from '@angular/router';
import { NurseLayout } from './components/nurse-layout/nurse-layout';
import { NurseChatView } from '../../communication/presentation/views/nurse-chat-view/nurse-chat-view';
import { NursePatients } from './views/nurse-patients/nurse-patients';
import { MotherDetailsView } from '../../patients/presentation/views/mother-details-view/mother-details-view';

const nurseHome = () =>
  import('./views/nurse-home/nurse-home').then((m) => m.NurseHome);

const nursePatients = () =>
  import('./views/nurse-patients/nurse-patients').then((m) => m.NursePatients);

const nurseConsultations = () =>
  import('./views/nurse-consultations/nurse-consultations').then((m) => m.NurseConsultations);

const nurseHistory = () =>
  import('./views/nurse-history/nurse-history').then((m) => m.NurseHistory);

export const nurseRoutes: Routes = [
  {
    path: '',
    component: NurseLayout,
    children: [
      {
        path: 'home',
        loadComponent: nurseHome,
        title: 'Inicio | FerovaClinic',
      },
      {
        path: 'patients',
        loadComponent: nursePatients,
        title: 'Pacientes | FerovaClinic',
      },
      {
        path: 'consultations',
        loadComponent: nurseConsultations,
        title: 'Consultas | FerovaClinic',
      },
      {
        path: 'history',
        loadComponent: nurseHistory,
        title: 'Historial | FerovaClinic',
      },
      {
        path: 'chat/:id',
        component: NurseChatView,
        title: 'Chat de Consulta | FerovaClinic'
      },

      { path: 'patients', component: NursePatients },

      {
        path: 'patients/mother/:id', // ⬅️ Ruta para los detalles de la madre
        component: MotherDetailsView
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
