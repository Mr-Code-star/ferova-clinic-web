import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TreatmentTrackingStore} from '../../../application/treatment-tracking-store';
import {Router} from '@angular/router';
import {NurseTreatment} from '../../../domain/model/nurse-treatment.entity';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

@Component({
  imports: [
    MatIcon,
    NgClass
  ],
  selector: 'app-my-treatments-view',
  styleUrl: './my-treatments-view.css',
  templateUrl: './my-treatments-view.html',
})
export class MyTreatmentsView implements OnInit {
  private readonly store = inject(TreatmentTrackingStore);
  private readonly router = inject(Router);

  readonly treatments = this.store.nurseTreatments;
  readonly loading = this.store.loading;

  activeFilter = signal<FilterType>('ALL');

  // Filtramos en cliente para respuesta instantánea
  filteredTreatments = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'ALL') return this.treatments();
    return this.treatments().filter(t => t.status === filter);
  });

  // Contadores para los badges de los tabs
  counters = computed(() => {
    const all = this.treatments();
    return {
      all: all.length,
      active: all.filter(t => t.status === 'ACTIVE').length,
      completed: all.filter(t => t.status === 'COMPLETED').length,
      abandoned: all.filter(t => t.status === 'ABANDONED').length
    };
  });

  ngOnInit(): void {
    this.store.loadNurseTreatments();
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
  }

  onBack() {
    this.router.navigate(['/nurse/home']);
  }

  onStartNewTreatment() {
    this.router.navigate(['/nurse/start-treatment']);
  }

  onViewDetails(treatment: NurseTreatment) {
  }
}
