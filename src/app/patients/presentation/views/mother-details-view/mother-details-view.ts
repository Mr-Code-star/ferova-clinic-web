import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ChildPatient, MotherPatientsList } from '../../components/mother-patients-list/mother-patients-list';
import { EmptyMotherPatients } from '../../components/empty-mother-patients/empty-mother-patients';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsStore } from '../../../application/patients-store';
import { Patient } from '../../../domain/model/patient.entity';
import { MatDialog } from '@angular/material/dialog';
import {
  SuccessAssignModal
} from '../../../../shared/presentation/components/success-assign-modal/success-assign-modal';
import { ErrorAssignModal } from '../../../../shared/presentation/components/error-assign-modal/error-assign-modal';

@Component({
  imports: [EmptyMotherPatients, MotherPatientsList],
  selector: 'app-mother-details-view',
  styleUrl: './mother-details-view.css',
  templateUrl: './mother-details-view.html',
})
export class MotherDetailsView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(PatientsStore);
  private readonly dialog = inject(MatDialog);

  readonly patients = this.store.patients;
  readonly loading = this.store.loading;
  readonly motherName = this.store.activeMother;

  ngOnInit(): void {
    const motherId = this.route.snapshot.paramMap.get('id');

    if (motherId) {
      this.store.loadPatientsByMother(motherId);
    }
  }

  onBack() {
    this.router.navigate(['/nurse/patients']);
  }

  onAssign(patient: Patient) {
    if (!patient.patientId) return;

    // 1. Llamamos al método del Store
    // (Necesitamos que assignPatient devuelva un Observable para saber si tuvo éxito o error)
    this.store.assignPatient(patient.patientId).subscribe({
      next: (response) => {
        // ✅ Éxito: Mostramos el modal verde
        this.dialog.open(SuccessAssignModal, {
          width: '400px',
          disableClose: true,
          data: {
            patientName: `${patient.patientName} ${patient.patientLastName}`
          }
        });
      },
      error: (err) => {
        // ❌ Error: Mostramos el modal azul/rojo con el mensaje del backend
        const errorMessage = err.error?.error || 'Error al asignar';
        const errorDetail = err.error?.detail || 'La enfermera no cuenta con un centro de salud asignado para realizar esta acción.';

        this.dialog.open(ErrorAssignModal, {
          width: '400px',
          disableClose: true,
          data: {
            message: errorMessage,
            detail: errorDetail
          }
        });
      }
    });
  }
}
