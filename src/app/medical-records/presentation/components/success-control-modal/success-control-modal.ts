import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-control-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './success-control-modal.html',
  styleUrl: './success-control-modal.css'
})
export class SuccessControlModal {
  constructor(
    public dialogRef: MatDialogRef<SuccessControlModal>,
    @Inject(MAT_DIALOG_DATA) public data: { patientName: string; hemoglobinLevel: number }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
