import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sintoma-modal',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './add-sintoma-modal.html',
  styleUrl: './add-sintoma-modal.css'
})
export class AddSintomaModal {
  searchTerm: string = '';

  // Síntomas frecuentes sugeridos
  frequentSymptoms = ['Somnolencia', 'Cefalea', 'Disnea', 'Palpitaciones'];

  constructor(
    public dialogRef: MatDialogRef<AddSintomaModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectSymptom(symptom: string): void {
    this.searchTerm = symptom;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onAdd(): void {
    if (!this.searchTerm.trim()) return;
    this.dialogRef.close(this.searchTerm.trim());
  }

  isValid(): boolean {
    return this.searchTerm.trim().length > 0;
  }
}
