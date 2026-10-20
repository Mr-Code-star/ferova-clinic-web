import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { SearchResource } from '../../../infrastructure/search-term-response';


@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-mother-result-card',
  styleUrl: './mother-result-card.css',
  templateUrl: './mother-result-card.html',
})
export class MotherResultCard {
  @Input() mother!: SearchResource;

  @Output() patients = new EventEmitter<SearchResource>();

  ShowPatients() {
    this.patients.emit(this.mother);
  }
}
