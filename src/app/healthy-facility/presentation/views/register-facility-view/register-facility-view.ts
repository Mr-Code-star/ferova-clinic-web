import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthFacilityApiEndpoint } from '../../../infrastructure/health-facility-api-endpoint';
import { DistrictResource } from '../../../infrastructure/district-response';
import { WizardStepGeneral } from '../../components/wizard-step-general/wizard-step-general';
import { WizardStepLocation } from '../../components/wizard-step-location/wizard-step-location';
import { WizardStepServices } from '../../components/wizard-step-services/wizard-step-services';
import { WizardStepAvailability } from '../../components/wizard-step-availability/wizard-step-availability';

@Component({
  selector: 'app-register-facility-view',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    WizardStepGeneral, WizardStepLocation, WizardStepServices, WizardStepAvailability
  ],
  templateUrl: './register-facility-view.html',
  styleUrl: './register-facility-view.css'
})
export class RegisterFacilityView implements OnInit {
  private readonly router = inject(Router);
  private readonly api = inject(HealthFacilityApiEndpoint);
  private readonly snackBar = inject(MatSnackBar);

  currentStep = signal<number>(1);
  districts = signal<DistrictResource[]>([]);
  loading = signal<boolean>(false);

  // Estado global del wizard
  formData = {
    name: '', districtId: '', address: '', phoneNumber: '',
    latitude: -12.0464, longitude: -77.0428,
    services: [] as string[],
    availableDays: [] as string[], availableSlots: [] as string[]
  };

  steps = [
    { num: 1, title: 'Información General', subtitle: 'Datos básicos de sede' },
    { num: 2, title: 'Ubicación Geográfica', subtitle: 'Geolocalización GPS' },
    { num: 3, title: 'Servicios', subtitle: 'Especialidades activas' },
    { num: 4, title: 'Disponibilidad', subtitle: 'Días y franjas horarias' }
  ];

  ngOnInit() {
    this.api.getDistricts().subscribe({
      next: (d) => {
        console.log('✅ Distritos cargados:', d);
        this.districts.set(d);
      },
      error: (err) => {
        console.error('❌ Error cargando distritos:', err);
      }
    });
  }

  onDataChange(stepData: any) {
    this.formData = { ...this.formData, ...stepData };
  }

  nextStep() {
    if (this.currentStep() < 4) this.currentStep.update(s => s + 1);
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    } else {
      this.router.navigate(['/admin/posts']);
    }
  }

  onSubmit() {
    this.loading.set(true);
    this.api.createFacility(this.formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Posta registrada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/admin/posts']);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.snackBar.open('Error al registrar la posta', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
