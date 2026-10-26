import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wizard-step-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wizard-step-availability.html',
  styleUrl: './wizard-step-availability.css'
})
export class WizardStepAvailability {
  @Input() data: any = { availableDays: [], availableSlots: [] };
  @Output() dataChange = new EventEmitter<any>();

  daysOfWeek = [
    { short: 'L', value: 'MONDAY' },
    { short: 'M', value: 'TUESDAY' },
    { short: 'M', value: 'WEDNESDAY' },
    { short: 'J', value: 'THURSDAY' },
    { short: 'V', value: 'FRIDAY' },
    { short: 'S', value: 'SATURDAY' },
    { short: 'D', value: 'SUNDAY' }
  ];

  // ⬇️ Cambiamos 'slots' a un signal o variable para que sea dinámico
  slots: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

  // ⬇️ NUEVAS VARIABLES PARA EL INPUT PERSONALIZADO
  isAddingSlot = false;
  newSlotTime = '';

  toggleDay(day: string) {
    const current = this.data.availableDays || [];
    const updated = current.includes(day)
      ? current.filter((d: string) => d !== day)
      : [...current, day];
    this.data = { ...this.data, availableDays: updated };
    this.dataChange.emit(this.data);
  }

  isDaySelected(day: string): boolean {
    return this.data.availableDays?.includes(day);
  }

  toggleSlot(slot: string) {
    const current = this.data.availableSlots || [];
    const updated = current.includes(slot)
      ? current.filter((s: string) => s !== slot)
      : [...current, slot];
    this.data = { ...this.data, availableSlots: updated };
    this.dataChange.emit(this.data);
  }

  isSlotSelected(slot: string): boolean {
    return this.data.availableSlots?.includes(slot);
  }

  // ⬇️ NUEVOS MÉTODOS
  showAddSlotInput() {
    this.isAddingSlot = true;
    this.newSlotTime = '';
  }

  cancelAddSlot() {
    this.isAddingSlot = false;
    this.newSlotTime = '';
  }

  addCustomSlot() {
    const time = this.newSlotTime.trim();
    if (!time) return;

    // Validamos que sea un formato válido HH:MM (simple)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      alert('Por favor, ingrese una hora válida en formato HH:MM (ej. 14:30)');
      return;
    }

    // Verificamos que no exista
    if (this.slots.includes(time)) {
      alert('Esta hora ya está en la lista.');
      return;
    }

    // Agregamos a la lista y lo seleccionamos automáticamente
    this.slots.push(time);
    this.slots.sort(); // Ordenamos por hora
    this.toggleSlot(time);

    // Cerramos el input
    this.isAddingSlot = false;
    this.newSlotTime = '';
  }
}
