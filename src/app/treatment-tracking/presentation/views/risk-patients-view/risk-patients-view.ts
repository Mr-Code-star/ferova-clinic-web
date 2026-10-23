import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentTrackingStore } from '../../../application/treatment-tracking-store';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  imports: [MatIcon, NgClass],
  selector: 'app-risk-patients-view',
  styleUrl: './risk-patients-view.css',
  templateUrl: './risk-patients-view.html',
})
export class RiskPatientsView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TreatmentTrackingStore);

  readonly patients = this.store.riskPatients;
  readonly loading = this.store.loading;

  riskLevel: string = '';
  title: string = '';
  subtitle: string = '';
  badgeClass: string = '';
  badgeText: string = '';
  alertText: string = '';

  ngOnInit(): void {
    this.riskLevel = this.route.snapshot.paramMap.get('level')?.toUpperCase() || 'HIGH';
    this.setupViewConfig();
    this.store.loadPatientsByRiskLevel(this.riskLevel);
  }

  private setupViewConfig(): void {
    switch (this.riskLevel) {
      case 'HIGH':
        this.title = 'Pacientes – Alto Riesgo';
        this.badgeClass = 'badge-high';
        this.badgeText = 'PRIORIDAD 1';
        this.alertText = 'Se requiere atención inmediata para estos perfiles.';
        break;
      case 'MEDIUM':
        this.title = 'Pacientes – Riesgo Medio';
        this.badgeClass = 'badge-medium';
        this.badgeText = 'MONITOREO PREVENTIVO';
        this.alertText = 'Monitoreo preventivo requerido.';
        break;
      case 'LOW':
        this.title = 'Pacientes – Riesgo Bajo';
        this.badgeClass = 'badge-low';
        this.badgeText = 'MONITOREO REGULAR';
        this.alertText = 'Pacientes con riesgo bajo.';
        break;
    }
  }

  onBack() {
    this.router.navigate(['/nurse/home']);
  }

  goToPatient(patientId: string) {
    this.router.navigate(['/nurse/patient-detail', patientId]);

  }
}
