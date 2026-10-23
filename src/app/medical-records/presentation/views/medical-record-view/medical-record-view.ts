import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalRecordStore } from '../../../application/medical-record-store';
import { PatientsStore } from '../../../../patients/application/patients-store';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MedicalRecordPdfService } from '../../../application/medical-record-pdf.service';

@Component({
  imports: [MatIcon, DatePipe, MatButton],
  selector: 'app-medical-record-view',
  styleUrl: './medical-record-view.css',
  templateUrl: './medical-record-view.html',
})
export class ViewMedicalRecord implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(MedicalRecordStore);
  private readonly patientsStore = inject(PatientsStore);
  private readonly pdfService = inject(MedicalRecordPdfService);

  patientId: string = '';

  // Signals del store
  readonly record = this.store.medicalRecord;
  readonly loading = this.store.loading;
  readonly canDownload = computed(() => !!this.record() && !this.loading());

  readonly patientName = computed(() => {
    const patient = this.patientsStore.selectedPatient();
    return patient ? patient.patientName : 'Paciente';
  });

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    if (this.patientId) {
      this.store.loadMedicalRecordByPatientId(this.patientId);
    }
  }

  onBack() {
    this.router.navigate(['/nurse/history']);
  }

  // Validación para mostrar el botón del primer control
  hasHemoglobinData(): boolean {
    const r = this.record();
    if (!r) return false;
    return r.hemoglobinLevel !== null || (r.controls && r.controls.length > 0);
  }

  onRegisterFirstControl() {
    // Navega al formulario de creación de control (deberás crear esta ruta)
    this.router.navigate(['/nurse/history/control/register', this.patientId]);
  }

  // Función dummy para el botón de descargar
  onDownload() {
    const r = this.record();
    if (!r || this.loading()) return;
    this.pdfService.downloadMedicalRecord(r, r.patientName ?? this.patientName());
  }

  goToControls() {
    const currentRecord = this.record();
    if (currentRecord) {
      this.router.navigate(['/nurse/history/controls', this.patientId, currentRecord.id]);
    }
  }
}
