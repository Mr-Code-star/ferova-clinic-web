import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Patient } from '../../../domain/model/patient.entity';
export interface ChildPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Masculino' | 'Femenino';
  isAssigned: boolean;
  assignedNurseName?: string;
}
@Component({
  imports: [MatIcon],
  selector: 'app-mother-patients-list',
  styleUrl: './mother-patients-list.css',
  templateUrl: './mother-patients-list.html',
})
export class MotherPatientsList {
  @Input() motherName: string = '';
  @Input() patients: Patient[] = []; // ⬅️ Cambiado

  @Output() back = new EventEmitter<void>();
  @Output() assign = new EventEmitter<Patient>(); // ⬅️ Cambiado

  onBack() { this.back.emit(); }
  onAssign(patient: Patient) { this.assign.emit(patient); } // ⬅️ Cambiado

  getGenderLabel(gender: string): string {
    return gender === 'MALE' ? 'Masculino' : 'Femenino';
  }
}
