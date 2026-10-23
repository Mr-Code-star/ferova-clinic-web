import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecordStore } from '../../../application/medical-record-store';
import { CreateMedicalRecordCommand } from '../../../domain/model/create-medical-record.command';
import { MatIcon } from '@angular/material/icon';
import { MedicalRecordForm } from '../../components/medical-record-form/medical-record-form';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMedicalRecordModal } from '../../components/success-medical-record-modal/success-medical-record-modal';

@Component({
  imports: [MatIcon, MedicalRecordForm],
  selector: 'app-update-medical-record-view',
  styleUrl: './update-medical-record-view.css',
  templateUrl: './update-medical-record-view.html',
})
export class UpdateMedicalRecordView implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(MedicalRecordStore);
  private readonly patientsStore = inject(PatientsStore);
  private readonly dialog = inject(MatDialog);

  patientId: string = '';

  readonly patientName = computed(() => {
    const patient = this.patientsStore.selectedPatient();
    return patient ? `${patient.patientName} ${patient.patientLastName}` : 'Paciente';
  });

  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly medicalRecord = this.store.medicalRecord; // Para pasar los datos al form

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    // Cargamos el historial existente para rellenar el formulario
    if (this.patientId) {
      this.store.loadMedicalRecordByPatientId(this.patientId);
    }
  }

  onBack() {
    this.router.navigate(['/nurse/history']);
  }

  onSave(command: CreateMedicalRecordCommand) {
    // Usamos el nuevo método del store
    this.store.updateMedicalRecord(command).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(SuccessMedicalRecordModal, {
          width: '400px',
          disableClose: true,
          data: { patientName: this.patientName(), isUpdate: true } // isUpdate para cambiar el texto del modal
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/nurse/history']);
        });
      },
      error: (err) => {
        console.error('Error actualizando historial:', err);
      }
    });
  }
}
