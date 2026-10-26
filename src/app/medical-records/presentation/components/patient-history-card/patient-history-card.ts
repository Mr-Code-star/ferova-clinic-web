import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Patient } from '../../../../patients/domain/model/patient.entity';
import { MedicalRecordApi } from '../../../infrastructure/medical-record-api';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-patient-history-card',
  styleUrl: './patient-history-card.css',
  templateUrl: './patient-history-card.html',
})
export class PatientHistoryCard implements OnInit {
  @Input() patient!: Patient;
  @Output() select = new EventEmitter<Patient>();

  @Output() viewHistory = new EventEmitter<Patient>();
  @Output() updateRecord = new EventEmitter<Patient>();

  private readonly medicalRecordApi = inject(MedicalRecordApi);
  private readonly cdr = inject(ChangeDetectorRef); // ⬅️ Inyectar

  hasMedicalRecord: boolean = false;

  ngOnInit(): void {
    if (this.patient && this.patient.id) {
      this.medicalRecordApi.getMedicalRecord(this.patient.id).subscribe({
        next: (record) => {
          this.hasMedicalRecord = true;
          this.cdr.detectChanges(); // ⬅️ Forzar actualización de la vista
        },
        error: (err) => {
          this.hasMedicalRecord = false;
          this.cdr.detectChanges(); // ⬅️ Forzar actualización
        },
      });
    }
  }

  onClick() {
    this.select.emit(this.patient);
  }

  onViewHistory(event: Event) {
    event.stopPropagation();
    this.viewHistory.emit(this.patient);
  }

  onUpdate(event: Event) {
    event.stopPropagation();
    this.updateRecord.emit(this.patient);
  }
}
