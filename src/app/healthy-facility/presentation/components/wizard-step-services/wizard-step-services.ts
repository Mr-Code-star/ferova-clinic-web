import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-wizard-step-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wizard-step-services.html',
  styleUrl: './wizard-step-services.css'
})
export class WizardStepServices {
  @Input() data: any = { services: [] };
  @Output() dataChange = new EventEmitter<any>();

  availableServices = [
    { name: 'Vacunación', icon: 'vaccines' },
    { name: 'Pediatría', icon: 'child_care' },
    { name: 'Medicina General', icon: 'medical_services' },
    { name: 'Enfermería', icon: 'health_and_safety' }
  ];

  newServiceName: string = '';


  toggleService(service: string) {
    const current = this.data.services || [];
    const updated = current.includes(service)
      ? current.filter((s: string) => s !== service)
      : [...current, service];

    this.data = { ...this.data, services: updated };
    this.dataChange.emit(this.data);
  }

  isSelected(service: string): boolean {
    return this.data.services?.includes(service);
  }
  addCustomService() {
    const serviceName = this.newServiceName.trim();

    if (!serviceName) return;

    // Verificamos si ya existe en la lista de opciones
    const existsInOptions = this.availableServices.some(
      s => s.name.toLowerCase() === serviceName.toLowerCase()
    );

    if (!existsInOptions) {
      // Lo agregamos a la lista visual
      this.availableServices.push({
        name: serviceName,
        icon: 'medical_information' // Icono genérico
      });
    }

    // Lo seleccionamos automáticamente
    if (!this.isSelected(serviceName)) {
      this.toggleService(serviceName);
    }

    // Limpiamos el input
    this.newServiceName = '';
  }
}
