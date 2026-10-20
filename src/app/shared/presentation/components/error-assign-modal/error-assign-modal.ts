import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

export interface ErrorModalData {
  message: string;
  detail: string;
}

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-error-assign-modal',
  styleUrl: './error-assign-modal.css',
  templateUrl: './error-assign-modal.html',
})
export class ErrorAssignModal {
  constructor(
    public dialogRef: MatDialogRef<ErrorAssignModal>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorModalData,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
