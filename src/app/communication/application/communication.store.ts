import { computed, inject, Injectable, signal } from '@angular/core';
import { CommunicationApi } from '../infrastructure/communication-api';
import { Consultation } from '../domain/model/consultation.entity';
import { InboxStatus } from '../domain/model/consultation-status.entity';

@Injectable({ providedIn: 'root' })
export class CommunicationStore {

  private readonly api = inject(CommunicationApi);

  // State signals
  private readonly consultationsSignal = signal<Consultation[]>([]);
  private readonly statusSignal = signal<InboxStatus | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly activeConsultationSignal = signal<Consultation | null>(null);

  // Readonly signals
  readonly consultations = this.consultationsSignal.asReadonly();
  readonly status = this.statusSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly activeConsultation = this.activeConsultationSignal.asReadonly();
  // Computed Signals
  readonly hasConsultations = computed(() => this.consultations().length > 0);

  /**
   * Constructor
   */
  constructor() {
    this.loadConsultations();
  }

  /**
   * Carga las consultas desde el backend (opcionalmente con un término de búsqueda).
   */
  loadConsultations(searchTerm: string = ''): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api.getNurseConsultations(searchTerm).subscribe({
      next: (result) => {
        // Si el backend devolvió el array (aunque esté vacío), el status será null.
        // Si devolvió el objeto de estado, lo guardamos.
        this.consultationsSignal.set(result.consultations);
        this.statusSignal.set(result.status);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        // Si el backend falla completamente, forzamos un estado vacío para no dejar la pantalla en blanco
        this.consultationsSignal.set([]);
        this.statusSignal.set(new InboxStatus({
          status: 'NO_CONSULTAS', // o 'SIN_PACIENTES' dependiendo de tu lógica de negocio
          message: 'Error de conexión',
          detail: 'No se pudieron cargar las consultas. Intenta de nuevo.'
        }));
        this.errorSignal.set(this.formatError(err, 'Failed to load consultations'));
        this.loadingSignal.set(false);
      }
    });
  }
  /**
   * Formats error messages.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    return fallback;
  }

  /**
   * Busca la consulta en la lista actual y la guarda como activa.
   */
  setActiveConsultation(consultationId: string): void {
    const found = this.consultations().find(c => c.consultationId === consultationId);
    if (found) {
      this.activeConsultationSignal.set(found);
    } else {
      console.warn('No se encontró la consulta con ID:', consultationId);
    }
  }

  removeConsultation(consultationId: string): void {
    this.consultationsSignal.update(consultas =>
      consultas.filter(c => c.consultationId !== consultationId)
    );
  }
}
