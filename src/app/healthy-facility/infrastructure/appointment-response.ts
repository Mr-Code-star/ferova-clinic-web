export interface AppointmentResource {
  appointmentId: string;
  patientId: string;
  patientName: string;
  facilityId: string;
  facilityName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string; // 'CONFIRMED' | 'PENDING' | ...
}

export interface AppointmentsResponse {
  success: boolean;
  data: AppointmentResource[];
  count: number;
}
