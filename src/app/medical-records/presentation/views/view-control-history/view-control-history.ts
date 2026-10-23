import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MedicalRecordStore } from '../../../application/medical-record-store';
import { PatientsStore } from '../../../../patients/application/patients-store';

@Component({
  selector: 'app-view-control-history',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './view-control-history.html',
  styleUrl: './view-control-history.css'
})
export class ViewControlHistory implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(MedicalRecordStore);
  private readonly patientsStore = inject(PatientsStore);

  patientId: string = '';
  medicalRecordId: string = '';

  readonly history = this.store.controlHistory;
  readonly loading = this.store.loading;

  readonly patientName = computed(() => {
    const patient = this.patientsStore.selectedPatient();
    return patient ? patient.patientName : 'Paciente';
  });

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientId') || '';
    this.medicalRecordId = this.route.snapshot.paramMap.get('medicalRecordId') || '';

    if (this.medicalRecordId) {
      this.store.loadControlHistory(this.medicalRecordId);
    }
  }

  onBack() {
    this.router.navigate(['/nurse/history/view', this.patientId]);
  }

  onNewControl() {
    this.router.navigate(['/nurse/history/control/register', this.patientId]);
  }

  // Retorna la clase CSS de la etiqueta según el estado
  getAnemiaBadgeClass(status: string): string {
    switch (status) {
      case 'CONTROLLED': return 'badge-controlled';
      case 'MILD': return 'badge-mild';
      case 'MODERATE': return 'badge-moderate';
      case 'SEVERE': return 'badge-severe';
      default: return '';
    }
  }

  // Retorna el texto legible del estado
  getAnemiaText(status: string): string {
    switch (status) {
      case 'CONTROLLED': return 'CONTROLADA';
      case 'MILD': return 'LEVE';
      case 'MODERATE': return 'MODERADA';
      case 'SEVERE': return 'GRAVE';
      default: return status;
    }
  }

  getEvolutionValue(): string {
    const evolution = this.history()?.evolution;
    if (evolution === undefined || evolution === null) return '0';
    return evolution > 0 ? `+${evolution}` : `${evolution}`;
  }

  // Retorna los colores/íconos según la tendencia
  getTrendData() {
    const trend = this.history()?.trend;
    if (trend === 'UP') return { icon: 'trending_up', color: '#16a34a', text: 'Incremento positivo registrado desde inicio del tratamiento' };
    if (trend === 'DOWN') return { icon: 'trending_down', color: '#dc2626', text: 'Disminución registrada desde inicio del tratamiento' };
    return { icon: 'trending_flat', color: '#475569', text: 'Sin cambios significativos desde inicio del tratamiento' };
  }
}
