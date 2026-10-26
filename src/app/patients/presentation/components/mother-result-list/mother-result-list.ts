import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MotherResultCard } from '../mother-result-card/mother-result-card';
import { SearchResource } from '../../../infrastructure/search-term-response';

@Component({
  imports: [MotherResultCard],
  selector: 'app-mother-result-list',
  styleUrl: './mother-result-list.css',
  templateUrl: './mother-result-list.html',
})
export class MotherResultList {
  @Input() results: SearchResource[] = [];
  @Input() hasSearched: boolean = false;
  @Input() loading: boolean = false;
  @Input() searchTerm: string = '';

  @Output() showPatients = new EventEmitter<SearchResource>();

  onShowPatients(patient: SearchResource) {
    this.showPatients.emit(patient);
  }
}
