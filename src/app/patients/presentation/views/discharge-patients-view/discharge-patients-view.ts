import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsStore} from '../../../application/patients-store';
import {Patient} from '../../../domain/model/patient.entity';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDischargeModal} from '../../components/confirm-discharge-modal/confirm-discharge-modal';

@Component({
  imports: [
    MatIcon,
    MatButton
  ],
  selector: 'app-discharge-patients-view',
  styleUrl: './discharge-patients-view.css',
  templateUrl: './discharge-patients-view.html',
})
export class DischargePatientsView implements OnInit {
  private readonly store = inject(PatientsStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly patients = this.store.dischargePatients;
  readonly loading = this.store.loading;

  readonly activeCount = this.store.activeCount;

  searchTerm = signal<string>('');

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.patients();
    return this.patients().filter(p =>
      p.patientName.toLowerCase().includes(term) ||
      p.patientLastName.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.store.loadDischargePatients();
    this.store.loadActivePatientsCount();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onBack() {
    this.router.navigate(['/nurse/home']);
  }

  onAssignPatient() {
    this.router.navigate(['/nurse/patients']);
  }

  onDischarge(patient: Patient) {
    if (!patient.patientId) return;

    const dialogRef = this.dialog.open(ConfirmDischargeModal, {
      width: '400px',
      disableClose: true,
      data: { patientName: `${patient.patientName} ${patient.patientLastName}` }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dischargePatient(patient.patientId!).subscribe({
          next: () => {
            console.log('Paciente dado de alta con éxito');
          },
          error: (err) => {
            console.error('Error al dar de alta:', err);
          }
        });
      }
    });
  }
}
