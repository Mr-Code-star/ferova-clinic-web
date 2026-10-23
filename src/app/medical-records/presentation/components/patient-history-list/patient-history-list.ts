import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatientHistoryCard } from '../patient-history-card/patient-history-card';
import { Patient } from '../../../../patients/domain/model/patient.entity';

@Component({
  imports: [PatientHistoryCard],
  selector: 'app-patient-history-list',
  styleUrl: './patient-history-list.css',
  templateUrl: './patient-history-list.html',
})
export class PatientHistoryList {
  @Input() patients: Patient[] = []; // ⬅️ Patient
  @Output() selectPatient = new EventEmitter<Patient>(); // ⬅️ Patient
  @Output() updatePatientRecord = new EventEmitter<Patient>();
  @Output() viewPatientRecord = new EventEmitter<Patient>();

  onSelect(patient: Patient) {
    this.selectPatient.emit(patient);
  }

  viewMedicalRecord(patient: Patient) {
    this.viewPatientRecord.emit(patient);
  }

  onUpdate(patient: Patient) {
    this.updatePatientRecord.emit(patient);
  }
}
