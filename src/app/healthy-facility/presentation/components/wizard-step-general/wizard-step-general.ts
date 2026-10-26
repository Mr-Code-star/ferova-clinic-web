import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DistrictResource } from '../../../infrastructure/district-response';

@Component({
  selector: 'app-wizard-step-general',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wizard-step-general.html',
  styleUrl: './wizard-step-general.css'
})
export class WizardStepGeneral {
  @Input() data: any = { name: '', districtId: '', address: '', phoneNumber: '+51 ' };
  @Input() districts: DistrictResource[] = [];
  @Output() dataChange = new EventEmitter<any>();

  onInput(field: string, value: string) {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
  }

  // ⬇️ NUEVO MÉTODO PARA EL TELÉFONO
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // 1. Si el usuario borra todo, volvemos a poner "+51 "
    if (!value || value.trim() === '+51' || value.trim() === '') {
      this.onInput('phoneNumber', '+51 ');
      input.value = '+51 ';
      return;
    }

    // 2. Extraemos solo los dígitos
    let digits = value.replace(/\D/g, '');

    // 3. Si empieza con 51 (porque el usuario pegó el número completo), lo quitamos
    if (digits.startsWith('51')) {
      digits = digits.substring(2);
    }

    // 4. Limitamos a 9 dígitos (el estándar en Perú)
    digits = digits.substring(0, 9);

    // 5. Construimos el valor final con el prefijo
    const finalValue = digits.length > 0 ? `+51 ${digits}` : '+51 ';

    // 6. Actualizamos el input y el modelo
    input.value = finalValue;
    this.onInput('phoneNumber', finalValue);
  }

  get isValid(): boolean {
    return this.data.name?.trim() && this.data.districtId && this.data.address?.trim();
  }
}
