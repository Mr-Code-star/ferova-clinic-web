import { Component, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EmptyConsultations } from '../empty-consultations/empty-consultations';

/** Modelo temporal para el diseño */
export interface Consultation {
  id: string;
  motherName: string;
  patientName: string;
  lastMessage: string;
}
@Component({
  imports: [MatIcon, EmptyConsultations],
  selector: 'app-consultation-inbox',
  styleUrl: './consultation-inbox.css',
  templateUrl: './consultation-inbox.html',
})
export class ConsultationInbox {
  // Datos de ejemplo (luego vendrán del backend)
  private readonly allConsultations: Consultation[] = [
    {
      id: '1',
      motherName: 'Maria Perez',
      patientName: 'Mateo',
      lastMessage: '"Doctora, Juan tuvo náuseas después de ..."',
    },
    {
      id: '2',
      motherName: 'Elena Rodriguez',
      patientName: 'Sofia',
      lastMessage: '"La fiebre ha bajado a 37.2. ¿Podemos reducir...?"',
    },
    {
      id: '3',
      motherName: 'Ana Lucía Gomez',
      patientName: 'Lucas',
      lastMessage: '"La erupción que le salió esta..."',
    },
  ];

  // Estado del buscador
  searchTerm = signal<string>('');

  // Lista filtrada reactivamente
  filteredConsultations = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allConsultations;

    return this.allConsultations.filter(
      (c) =>
        c.motherName.toLowerCase().includes(term) || c.patientName.toLowerCase().includes(term),
    );
  });

  // Método para actualizar el buscador
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  /** Limpia el filtro al hacer click en "Borrar filtro" del estado vacío */
  onClearFilter(): void {
    this.searchTerm.set('');
  }
}
