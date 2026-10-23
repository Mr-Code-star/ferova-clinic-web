import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-medical-record-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './success-medical-record-modal.html',
  styleUrl: './success-medical-record-modal.css'
})
export class SuccessMedicalRecordModal {
  constructor(
    public dialogRef: MatDialogRef<SuccessMedicalRecordModal>,
    @Inject(MAT_DIALOG_DATA) public data: { patientName: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
