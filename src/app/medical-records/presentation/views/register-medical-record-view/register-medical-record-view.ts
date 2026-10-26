import { Component, computed, inject } from '@angular/core';
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
  selector: 'app-register-medical-record-view',
  styleUrl: './register-medical-record-view.css',
  templateUrl: './register-medical-record-view.html',
})
export class RegisterMedicalRecordView {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(MedicalRecordStore);
  private readonly patientsStore = inject(PatientsStore);
  private readonly dialog = inject(MatDialog)
  patientId: string = '';
  readonly patientName = computed(() => {
    const patient = this.patientsStore.selectedPatient();
    return patient ? `${patient.patientName} ${patient.patientLastName}` : 'Paciente';
  });
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    // Opcional: Si tienes un store de pacientes, podrías buscar el nombre por el ID
  }

  onBack() {
    this.router.navigate(['/nurse/history']);
  }

  onSave(command: CreateMedicalRecordCommand) {
    this.store.saveMedicalRecord(command).subscribe({
      next: () => {
        // ⬇️ Abrimos el modal de éxito
        const dialogRef = this.dialog.open(SuccessMedicalRecordModal, {
          width: '400px',
          disableClose: true,
          data: { patientName: this.patientName() }
        });

        // Al cerrar el modal, redirigimos
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/nurse/history']);
        });
      },
      error: (err) => {
        console.error('Error guardando historial:', err);
      }
    });
  }
}
