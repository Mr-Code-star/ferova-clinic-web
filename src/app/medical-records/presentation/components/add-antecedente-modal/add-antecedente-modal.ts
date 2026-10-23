import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-antecedente-modal',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './add-antecedente-modal.html',
  styleUrl: './add-antecedente-modal.css'
})
export class AddAntecedenteModal {
  type: string = '';
  description: string = '';

  // Opciones sugeridas (puedes ampliarlas)
  tipoOptions = ['ALERGIA', 'CRÓNICO', 'QUIRÚRGICO', 'FAMILIAR'];

  constructor(
    public dialogRef: MatDialogRef<AddAntecedenteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onAdd(): void {
    if (!this.type.trim() || !this.description.trim()) return;
    this.dialogRef.close({ type: this.type.trim(), description: this.description.trim() });
  }

  isValid(): boolean {
    return this.type.trim().length > 0 && this.description.trim().length > 0;
  }
}
