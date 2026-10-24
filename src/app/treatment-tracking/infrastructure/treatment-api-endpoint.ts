import {Injectable} from '@angular/core';
import {TreatmentDetailAssembler} from './treatment-detail-assembler';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {TreatmentDetail} from '../domain/model/treatment-detail.entity';
import {NextDoseResponse, TreatmentDetailResource, WeeklyAdherenceResponse} from './treatment-detail-response';
import {environment} from '../../../envirotments/environment.development';
import {WeeklyAdherenceAssembler} from './weekly-adherence-assembler';
import {NextDoseAssembler} from './next-dose-assembler';
import {WeeklyAdherence} from '../domain/model/weekly-adherence.entity';
import {NextDose} from '../domain/model/next-dose.entity';
import {NurseTreatmentsResponse} from './nurse-treatments-response';
import {NurseTreatment} from '../domain/model/nurse-treatment.entity';
import {NurseTreatmentsAssembler} from './nurse-treatments-assembler';

const treatmentTrackingUrl = `${environment.serverBasePath}${environment.treatmentTrackingEndpointPath}`;

@Injectable({providedIn: 'root'})
export class TreatmentApiEndpoint {
  private readonly treatmentAssembler = new TreatmentDetailAssembler();
  private readonly weeklyAssembler = new WeeklyAdherenceAssembler();
  private readonly nextDoseAssembler = new NextDoseAssembler();
  private readonly nurseTreatmentsAssembler = new NurseTreatmentsAssembler();

  constructor(private http: HttpClient) {}

  getTreatmentDetail(patientId: string): Observable<TreatmentDetail> {
    return this.http
      .get<TreatmentDetailResource>(
        `${treatmentTrackingUrl}/patients/${patientId}/treatment-detail`,
      )
      .pipe(
        map((response) => this.treatmentAssembler.toEntityFromResource(response)),
      );
  }

  getWeeklyAdherence(patientId: string): Observable<WeeklyAdherence> {
    return this.http
      .get<WeeklyAdherenceResponse>(`${treatmentTrackingUrl}/patients/${patientId}/weekly-adherence`)
      .pipe(map(r => this.weeklyAssembler.toEntityFromResponse(r)));
  }

  getNextDose(patientId: string): Observable<NextDose> {
    return this.http
      .get<NextDoseResponse>(`${treatmentTrackingUrl}/patients/${patientId}/next-dose`)
      .pipe(map(r => this.nextDoseAssembler.toEntityFromResponse(r)));
  }

  getNurseTreatments(status?: string): Observable<NurseTreatment[]> {
    const url = status
      ? `${treatmentTrackingUrl}/nurses/treatments?status=${status}`
      : `${treatmentTrackingUrl}/nurses/treatments`;

    return this.http.get<NurseTreatmentsResponse>(url).pipe(
      map(response => this.nurseTreatmentsAssembler.toEntitiesFromResponse(response))
    );
  }
}
