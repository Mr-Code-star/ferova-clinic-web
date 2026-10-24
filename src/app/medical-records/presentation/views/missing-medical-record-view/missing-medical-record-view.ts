import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missing-medical-record-view',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './missing-medical-record-view.html',
  styleUrl: './missing-medical-record-view.css'
})
export class MissingMedicalRecordView {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  patientId: string = '';
  patientName: string = 'Paciente';

  constructor() {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    // Nota: podrías obtener el nombre real del paciente desde el PatientsStore
    // si guardaste el paciente seleccionado previamente.
  }

  onBack() {
    // Regresa a la lista de selección de pacientes
    this.router.navigate(['/nurse/hemoglobin-control']);
  }

  onRegisterMedicalRecord() {
    // Navega al formulario de historial médico
    this.router.navigate(['/nurse/history/register', this.patientId]);
  }
}
