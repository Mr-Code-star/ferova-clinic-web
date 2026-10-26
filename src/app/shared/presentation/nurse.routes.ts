import { Routes } from '@angular/router';
import { NurseLayout } from './components/nurse-layout/nurse-layout';
import { NurseChatView } from '../../communication/presentation/views/nurse-chat-view/nurse-chat-view';
import { NursePatients } from './views/nurse-patients/nurse-patients';
import { MotherDetailsView } from '../../patients/presentation/views/mother-details-view/mother-details-view';
import {
  RegisterMedicalRecordView
} from '../../medical-records/presentation/views/register-medical-record-view/register-medical-record-view';
import { ViewMedicalRecord } from '../../medical-records/presentation/views/medical-record-view/medical-record-view';
import {
  UpdateMedicalRecordView
} from '../../medical-records/presentation/views/update-medical-record-view/update-medical-record-view';
import {
  RegisterControlView
} from '../../medical-records/presentation/views/register-control-view/register-control-view';
import { ViewControlHistory } from '../../medical-records/presentation/views/view-control-history/view-control-history';
import { RiskPatientsView } from '../../treatment-tracking/presentation/views/risk-patients-view/risk-patients-view';
import {
  TreatmentDetailView
} from '../../treatment-tracking/presentation/views/treatment-detail-view/treatment-detail-view';
import {
  NurseAppointmentsList
} from '../../healthy-facility/presentation/views/nurse-appointments-list/nurse-appointments-list';
import {HemoglobinControlView} from '../../patients/presentation/views/hemoglobin-control-view/hemoglobin-control-view';
import {
  MissingMedicalRecordView
} from '../../medical-records/presentation/views/missing-medical-record-view/missing-medical-record-view';
import {DischargePatientsView} from '../../patients/presentation/views/discharge-patients-view/discharge-patients-view';
import {
  StartTreatmentView
} from '../../treatment-tracking/presentation/views/start-treatment-view/start-treatment-view';
import {
  StartTreatmentFormView
} from '../../treatment-tracking/presentation/views/start-treatment-form-view/start-treatment-form-view';
import {MyTreatmentsView} from '../../treatment-tracking/presentation/views/my-treatments-view/my-treatments-view';
import {
  TreatmentDetailByIdView
} from '../../treatment-tracking/presentation/views/treatment-detail-by-id-view/treatment-detail-by-id-view';

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
    path: 'hemoglobin-control',
    component: HemoglobinControlView,
    title: 'Control de Hemoglobina | FerovaClinic'
  },
  {
    path: 'missing-medical-record/:id',
    component: MissingMedicalRecordView,
    title: 'Falta Historial Médico | FerovaClinic'
  },
  {
    path: 'history/control/register/:id',
    component: RegisterControlView,
    title: 'Nuevo Control | FerovaClinic'
  },
  {
    path: 'history/view/:id',
    component: ViewMedicalRecord,
    title: 'Ver Historial | FerovaClinic'
  },
  {
    path: 'history/update/:id',
    component: UpdateMedicalRecordView,
    title: 'Actualizar Historial | FerovaClinic'
  },
  {
    path: 'chat/:id',
    component: NurseChatView,
    title: 'Chat de Consulta | FerovaClinic'
  },
  {
    path: 'start-treatment',
    component: StartTreatmentView,
    title: 'Iniciar Tratamiento | FerovaClinic'
  },
  {
    path: 'start-treatment/form/:id',
    component: StartTreatmentFormView,
    title: 'Configurar Tratamiento | FerovaClinic'
  },
  {
    path: 'my-treatments',
    component: MyTreatmentsView,
    title: 'Mis Tratamientos | FerovaClinic'
  },
  {
    path: 'my-treatments/detail/:id',
    component: TreatmentDetailByIdView,
    title: 'Detalle de Tratamiento | FerovaClinic'
  },
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
      { path: 'patients', component: NursePatients },

      {
        path: 'patients/mother/:id', // ⬅️ Ruta para los detalles de la madre
        component: MotherDetailsView
      },
      {
        path: 'history/register/:id', // ⬅️ Recibe el ID del paciente
        component: RegisterMedicalRecordView
      },
      {
        path: 'risk/:level',
        component: RiskPatientsView
      },
      {
        path: 'patient-detail/:id',
        component: TreatmentDetailView
      },
      {
        path: 'appointments',
        component: NurseAppointmentsList,
        title: 'Agenda de Citas | FerovaClinic'
      },
      {
        path: 'discharge-patients',
        component: DischargePatientsView,
        title: 'Dar de Alta Paciente | FerovaClinic'
      },

      {
        path: 'history/controls/:patientId/:medicalRecordId',
        component: ViewControlHistory,
        title: 'Historial de Controles | FerovaClinic'
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
