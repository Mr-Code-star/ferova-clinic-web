import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HealthFacilityStore } from '../../../application/health-facility-store';
import { UnassignedNurse } from '../../../domain/model/unassigned-nurse.entity';

@Component({
  selector: 'app-assign-nurse-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './assign-nurse-view.html',
  styleUrl: './assign-nurse-view.css'
})
export class AssignNurseView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(HealthFacilityStore);

  facilityId: string = '';
  facilityName: string = '';

  readonly nurses = this.store.unassignedNurses;
  readonly canRegister = this.store.canRegister;
  readonly canRegisterMessage = this.store.canRegisterMessage;
  readonly assigning = this.store.assigning;

  selectedNurseId = signal<string | null>(null);

  ngOnInit(): void {
    this.facilityId = this.route.snapshot.paramMap.get('id') || '';
    this.facilityName = this.route.snapshot.queryParamMap.get('name') || 'la posta';

    // 1. Verificamos si se puede registrar
    this.store.checkCanRegister();

    // 2. Cargamos los enfermeros no asignados
    this.store.loadUnassignedNurses();
  }

  onBack() {
    this.router.navigate(['/admin/posts']);
  }

  selectNurse(nurse: UnassignedNurse) {
    this.selectedNurseId.set(nurse.id);
  }

  onConfirm() {
    const nurseId = this.selectedNurseId();
    if (!nurseId) return;

    this.store.assignNurse(this.facilityId, nurseId);

    // Esperamos un poco para que el backend procese y redirigimos
    setTimeout(() => {
      this.router.navigate(['/admin/posts']);
    }, 1000);
  }
}
