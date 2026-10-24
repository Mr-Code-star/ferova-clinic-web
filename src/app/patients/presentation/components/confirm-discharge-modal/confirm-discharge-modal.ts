import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

export interface DischargeModalData {
  patientName: string;
}

@Component({
  imports: [
    MatIcon
  ],
  selector: 'app-confirm-discharge-modal',
  styleUrl: './confirm-discharge-modal.css',
  templateUrl: './confirm-discharge-modal.html',
})
export class ConfirmDischargeModal {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDischargeModal>,
    @Inject(MAT_DIALOG_DATA) public data: DischargeModalData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
