import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TreatmentTrackingStore} from '../../../application/treatment-tracking-store';
import {Router} from '@angular/router';
import {PendingPatient} from '../../../domain/model/pending-patient.entity';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [
    MatIcon, FormsModule, MatIconModule
  ],
  selector: 'app-start-treatment-view',
  styleUrl: './start-treatment-view.css',
  templateUrl: './start-treatment-view.html',
})
export class StartTreatmentView implements OnInit {
  private readonly store = inject(TreatmentTrackingStore);
  private readonly router = inject(Router);

  readonly patients = this.store.pendingPatients;
  readonly state = this.store.pendingState;
  readonly loading = this.store.loading;

  searchTerm = signal<string>('');

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.patients();
    return this.patients().filter(p =>
      p.patientName.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.store.loadPendingPatients();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onBack() {
    this.router.navigate(['/nurse/home']);
  }

  onAssignPatients() {
    this.router.navigate(['/nurse/patients']);
  }

  onStartControl(patient: PendingPatient) {
    // Aquí podrías navegar al formulario para iniciar el tratamiento
    console.log('Iniciar control para:', patient);
  }
}
