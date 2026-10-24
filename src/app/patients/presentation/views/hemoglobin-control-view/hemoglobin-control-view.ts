import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {PatientsStore} from '../../../application/patients-store';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../../domain/model/patient.entity';
import {MatIcon} from '@angular/material/icon';

@Component({
  imports: [
    MatIcon
  ],
  selector: 'app-hemoglobin-control-view',
  styleUrl: './hemoglobin-control-view.css',
  templateUrl: './hemoglobin-control-view.html',
})
export class HemoglobinControlView implements OnInit {
  private readonly store = inject(PatientsStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  searchTerm = signal<string>('');

  readonly patients = this.store.patients;
  readonly loading = this.store.loading;

  ngOnInit(): void {
    this.store.loadAssignedPatients();
  }

  onBack() {
    this.router.navigate(['/nurse/home']);
  }

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.patients();

    return this.patients().filter(p =>
      p.patientName.toLowerCase().includes(term) ||
      p.patientLastName.toLowerCase().includes(term)
    );
  });

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }


  onSelectPatient(patient: Patient) {
    if (!patient.patientId) return;
    this.store.setSelectedPatient(patient);

    const from = this.route.snapshot.queryParamMap.get('from') ?? 'hemoglobin-control';

    this.store.checkMedicalRecord(patient.patientId).subscribe({
      next: (hasMedicalRecord) => {
        if (hasMedicalRecord) {
          this.router.navigate(
            ['/nurse/history/control/register', patient.patientId],
            { queryParams: { from } }
          );
        } else {
          this.router.navigate(
            ['/nurse/missing-medical-record', patient.patientId],
            { queryParams: { from } }
          );
        }
      },
      error: () => {
        this.router.navigate(
          ['/nurse/missing-medical-record', patient.patientId],
          { queryParams: { from } }
        );
      }
    });
  }
}
