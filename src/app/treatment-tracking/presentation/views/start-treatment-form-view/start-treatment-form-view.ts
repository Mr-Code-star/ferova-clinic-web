import {Component, computed, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TreatmentTrackingStore} from '../../../application/treatment-tracking-store';
import {MatDialog} from '@angular/material/dialog';
import {CreateTreatmentCommand} from '../../../domain/model/create-treatment.command';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {SuccessTreatmentModal} from '../../components/success-treatment-modal/success-treatment-modal';

@Component({
  imports: [
    MatIcon,
    FormsModule
  ],
  selector: 'app-start-treatment-form-view',
  styleUrl: './start-treatment-form-view.css',
  templateUrl: './start-treatment-form-view.html',
})
export class StartTreatmentFormView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TreatmentTrackingStore);
  private readonly dialog = inject(MatDialog);

  patientId: string = '';
  readonly selectedPatient = this.store.selectedPendingPatient;
  readonly patientName = computed(() =>
    this.selectedPatient()?.patientName || 'Paciente'
  );

  // Formulario
  supplementName = 'Sulfato Ferroso (Gotas)';
  quantity = '2ml';
  dosageHours = '08:00 AM';
  durationDays = 90;

  readonly loading = this.store.loading;

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
  }

  onBack() {
    this.router.navigate(['/nurse/start-treatment']);
  }

  onActivate() {
    // Validación extra
    if (!this.patientId) {
      return;
    }

    const command = new CreateTreatmentCommand({
      patientId: this.patientId,
      supplementName: this.supplementName,
      quantity: this.quantity,
      dosingHours: this.dosageHours,
      durationDays: this.durationDays
    });

    this.store.startTreatment(command).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(SuccessTreatmentModal, {
          width: '400px',
          disableClose: true,
          // ⬇️ Aquí faltaban los paréntesis en patientName()
          data: { patientName: this.patientName() }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/nurse/start-treatment']);
        });
      },
      error: (err) => {
        console.error('Error activando tratamiento:', err);
      }
    });
  }
}
