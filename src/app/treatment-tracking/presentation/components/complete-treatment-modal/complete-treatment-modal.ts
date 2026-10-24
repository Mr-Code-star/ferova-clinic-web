import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-treatment-modal',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './complete-treatment-modal.html',
  styleUrl: './complete-treatment-modal.css'
})
export class CompleteTreatmentModal {
  observation: string = '';

  constructor(public dialogRef: MatDialogRef<CompleteTreatmentModal>) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    if (this.observation.trim()) {
      this.dialogRef.close(this.observation.trim());
    }
  }
}
