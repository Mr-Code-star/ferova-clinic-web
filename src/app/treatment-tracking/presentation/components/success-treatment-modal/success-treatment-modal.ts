import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  imports: [
    MatIcon,
    MatButton
  ],
  selector: 'app-success-treatment-modal',
  styleUrl: './success-treatment-modal.css',
  templateUrl: './success-treatment-modal.html',
})
export class SuccessTreatmentModal {
  constructor(
    public dialogRef: MatDialogRef<SuccessTreatmentModal>,
    @Inject(MAT_DIALOG_DATA) public data: { patientName: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
