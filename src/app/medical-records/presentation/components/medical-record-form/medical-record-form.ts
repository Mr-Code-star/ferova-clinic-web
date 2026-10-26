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
  @Input() initialData: any = null;

  @Output() save = new EventEmitter<CreateMedicalRecordCommand>();

  // Modelo del formulario
  weight: number | null = null;
  height: number | null = null;
  motivoConsulta: string = '';
  observaciones: string = '';
  antecedentes: string[] = [];
  sintomas: string[] = [];
  gender: string = '';

  ngOnInit(): void {
    // Si hay datos iniciales, rellenamos el formulario
    if (this.initialData) {
      this.weight = this.initialData.weight;
      this.height = this.initialData.height;
      this.motivoConsulta = this.initialData.motivoConsulta;
      this.observaciones = this.initialData.observaciones;
      this.gender = this.initialData.gender === 'MALE' ? 'Masculino' : 'Femenino';

      // Mapeamos los antecedentes al formato de string para el TagInput
      this.antecedentes = this.initialData.antecedentes.map(
        (a: any) => `${a.type}: ${a.description}`
      );
      this.sintomas = [...this.initialData.sintomas];
    }
  }

  onSubmit() {
    if (!this.weight || !this.height || !this.motivoConsulta.trim() || !this.patientId) return;

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
