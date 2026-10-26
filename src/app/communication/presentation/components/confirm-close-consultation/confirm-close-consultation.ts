import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Interfaz para los datos que le pasaremos al modal (opcional pero recomendado)
export interface DialogData {
  patientName: string;
}

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-confirm-close-consultation',
  styleUrl: './confirm-close-consultation.css',
  templateUrl: './confirm-close-consultation.html',
})
export class ConfirmCloseConsultation {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCloseConsultation>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Devuelve false si cancela
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve true si confirma
  }
}
