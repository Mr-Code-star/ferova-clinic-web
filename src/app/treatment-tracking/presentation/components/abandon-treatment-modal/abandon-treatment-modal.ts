import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abandon-treatment-modal',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './abandon-treatment-modal.html',
  styleUrl: './abandon-treatment-modal.css'
})
export class AbandonTreatmentModal {
  observation: string = '';

  constructor(public dialogRef: MatDialogRef<AbandonTreatmentModal>) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    if (this.observation.trim()) {
      this.dialogRef.close(this.observation.trim());
    }
  }
}
