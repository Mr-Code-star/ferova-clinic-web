import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { EmptyConsultations } from '../empty-consultations/empty-consultations';
import { EmptyPendingConsultations } from '../empty-pending-consultations/empty-pending-consultations';
import { Consultation } from '../../../domain/model/consultation.entity';
import { InboxStatus } from '../../../domain/model/consultation-status.entity';
import { EmptyPatients } from '../../../../shared/presentation/components/empty-patients/empty-patients';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    MatIcon,
    EmptyConsultations,
    EmptyPendingConsultations,
    EmptyPatients,
    RouterLink,
  ],
  selector: 'app-consultation-inbox',
  styleUrl: './consultation-inbox.css',
  templateUrl: './consultation-inbox.html',
})
export class ConsultationInbox {
  // ============================================
  // DATOS DE ENTRADA (desde la vista padre)
  // ============================================
  @Input() consultations: Consultation[] = [];
  @Input() status: InboxStatus | null = null;
  @Input() loading: boolean = false;

  // ============================================
  // EVENTOS DE SALIDA (hacia la vista padre)
  // ============================================
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearFilter = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();

  // ============================================
  // MÉTODOS
  // ============================================
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value); // ✅ Emitimos un string
  }

  onClearFilterClick(): void {
    this.clearFilter.emit();
  }

  onRefreshList(): void {
    this.refreshList.emit();
  }
}
