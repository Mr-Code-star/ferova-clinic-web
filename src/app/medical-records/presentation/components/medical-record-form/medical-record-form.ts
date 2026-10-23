import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateMedicalRecordCommand } from '../../../domain/model/create-medical-record.command';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TagInput } from '../tag-input/tag-input';

@Component({
  imports: [MatIcon, MatButton, FormsModule, TagInput],
  selector: 'app-medical-record-form',
  styleUrl: './medical-record-form.css',
  templateUrl: './medical-record-form.html',
})
export class MedicalRecordForm {
  @Input() patientId: string = '';
  @Input() loading: boolean = false;

  @Output() save = new EventEmitter<CreateMedicalRecordCommand>();

  // Modelo del formulario
  weight: number | null = null;
  height: number | null = null;
  motivoConsulta: string = '';
  observaciones: string = '';
  antecedentes: string[] = [];
  sintomas: string[] = [];

  onSubmit() {
    if (!this.weight || !this.height || !this.motivoConsulta.trim() || !this.patientId) return;

    // Convertimos los antecedentes de string[] a { type, description }[]
    const antecedentesMapped = this.antecedentes.map((ant) => {
      const [type, ...desc] = ant.split(':');
      return {
        type: type.trim(),
        description: desc.join(':').trim(),
      };
    });

    const command = new CreateMedicalRecordCommand({
      patientId: this.patientId,
      weight: this.weight,
      height: this.height,
      motivoConsulta: this.motivoConsulta.trim(),
      observaciones: this.observaciones.trim(),
      antecedentes: antecedentesMapped,
      sintomas: this.sintomas,
    });

    this.save.emit(command);
  }
}
