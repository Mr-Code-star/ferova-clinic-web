import { AssignmentStatus, Gender } from '../domain/model/patient.entity';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface PatientResource extends BaseResource{
   patientId: string | null;
   patientName: string;
   patientLastName: string;
   gender: Gender;
   status: string;
   statusAssignment: AssignmentStatus
}

export interface PatientResponse extends BaseResponse {
  data: PatientResource[];
}
