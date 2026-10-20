import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

export interface SuccessModalData {
  patientName: string;
}


@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-success-assign-modal',
  styleUrl: './success-assign-modal.css',
  templateUrl: './success-assign-modal.html',
})
export class SuccessAssignModal {
  constructor(
    public dialogRef: MatDialogRef<SuccessAssignModal>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessModalData,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
