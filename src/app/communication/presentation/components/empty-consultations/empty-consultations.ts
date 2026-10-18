import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatCard, MatCardContent, MatIcon, MatButton],
  selector: 'app-empty-consultations',
  styleUrl: './empty-consultations.css',
  templateUrl: './empty-consultations.html',
})
export class EmptyConsultations {

  /** Término de búsqueda que no encontró resultados */
  @Input() searchTerm: string = '';

  /** Evento que se emite al hacer click en "Borrar filtro" */
  @Output() clearFilter = new EventEmitter<void>();

  onClearFilter(): void {
    this.clearFilter.emit();
  }
}
