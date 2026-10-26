import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon],
  selector: 'app-patient-search-bar',
  styleUrl: './patient-search-bar.css',
  templateUrl: './patient-search-bar.html',
})
export class PatientSearchBar {
  @Output() search = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
