import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon],
  selector: 'app-empty-mother-patients',
  styleUrl: './empty-mother-patients.css',
  templateUrl: './empty-mother-patients.html',
})
export class EmptyMotherPatients {
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
