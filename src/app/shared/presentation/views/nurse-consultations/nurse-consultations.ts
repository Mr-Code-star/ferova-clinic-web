import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  ConsultationInbox
} from '../../../../communication/presentation/components/consultation-inbox/consultation-inbox';
import { CommunicationStore } from '../../../../communication/application/communication.store';

@Component({
  imports: [ConsultationInbox],
  selector: 'app-nurse-consultations',
  styleUrl: './nurse-consultations.css',
  templateUrl: './nurse-consultations.html',
})
export class NurseConsultations implements OnInit, OnDestroy {
  private readonly store = inject(CommunicationStore);

  // Exponemos los datos del store
  readonly consultations = this.store.consultations;
  readonly status = this.store.status;
  readonly loading = this.store.loading;

  private searchTimeout: any;

  ngOnInit(): void {
    // La carga inicial ya la hace el constructor del Store
  }

  ngOnDestroy(): void {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
  }

  onSearchChange(term: string): void {
    // Cancelamos la búsqueda anterior si el usuario sigue escribiendo
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    // Esperamos 300ms antes de hacer la petición al backend
    this.searchTimeout = setTimeout(() => {
      this.store.loadConsultations(term);
    }, 300);
  }

  onClearFilter(): void {
    this.store.loadConsultations('');
  }

  onRefreshList() {
    this.store.loadConsultations('');
  }
}
