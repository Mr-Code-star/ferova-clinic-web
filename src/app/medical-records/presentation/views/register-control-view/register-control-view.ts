import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MedicalRecordStore } from '../../../application/medical-record-store';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { CreateControlCommand } from '../../../domain/model/create-control.command';
import { MatDialog } from '@angular/material/dialog';
import { SuccessControlModal } from '../../components/success-control-modal/success-control-modal';

@Component({
  selector: 'app-register-control',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './register-control-view.html',
  styleUrl: './register-control-view.css'
})
export class RegisterControlView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(MedicalRecordStore);
  private readonly patientsStore = inject(PatientsStore);
  private readonly dialog = inject(MatDialog); // ⬅️ Inyectar MatDialog

  patientId: string = '';
  hemoglobinLevel: number | null = null;
  loading = this.store.loading;

  readonly patient = computed(() => this.patientsStore.selectedPatient());
  readonly currentDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
  }

  onBack() {
    this.router.navigate(['/nurse/history/view', this.patientId]);
  }

  onSave() {
    if (!this.hemoglobinLevel || !this.patientId) return;

    const command = new CreateControlCommand({
      patientId: this.patientId,
      hemoglobinLevel: this.hemoglobinLevel
    });

    this.store.saveHemoglobinControl(command).subscribe({
      next: () => {
        // ⬇️ Abrimos el nuevo modal de éxito
        const dialogRef = this.dialog.open(SuccessControlModal, {
          width: '420px',
          disableClose: true,
          data: {
            patientName: this.patient()?.patientName || 'el paciente',
            hemoglobinLevel: this.hemoglobinLevel
          }
        });

        // Al cerrar el modal, volvemos a la vista del historial
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/nurse/history/view', this.patientId]);
        });
      },
      error: (err) => {
        console.error('Error al guardar el control:', err);
      }
    });
  }
}
