import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreatmentTrackingStore } from '../../../application/treatment-tracking-store';
import {MatDialog} from '@angular/material/dialog';
import {JustifyTreatmentCommand} from '../../../domain/model/justify-treatment.command';
import {CompleteTreatmentModal} from '../../components/complete-treatment-modal/complete-treatment-modal';
import {AbandonTreatmentModal} from '../../components/abandon-treatment-modal/abandon-treatment-modal';

@Component({
  selector: 'app-treatment-detail-by-id-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './treatment-detail-by-id-view.html',
  styleUrl: './treatment-detail-by-id-view.css'
})
export class TreatmentDetailByIdView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TreatmentTrackingStore);
  private readonly dialog = inject(MatDialog);

  readonly detail = this.store.treatmentDetailById;
  readonly loading = this.store.loading;

  treatmentId: string = '';

  ngOnInit(): void {
    this.treatmentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.treatmentId) {
      this.store.loadTreatmentDetailById(this.treatmentId);
    }
  }

  onBack() {
    this.router.navigate(['/nurse/my-treatments']);
  }

  onMarkCompleted() {
    const dialogRef = this.dialog.open(CompleteTreatmentModal, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((observation: string | null) => {
      if (observation) {
        const command = new JustifyTreatmentCommand({
          treatmentId: this.treatmentId,
          observation
        });

        this.store.completeTreatment(command).subscribe({
          next: () => {
            // Recargamos el detalle para ver la nota
            this.store.loadTreatmentDetailById(this.treatmentId);
          },
          error: (err) => console.error('Error al completar:', err)
        });
      }
    });
  }

  onRegisterAbandonment() {
    const dialogRef = this.dialog.open(AbandonTreatmentModal, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((observation: string | null) => {
      if (observation) {
        const command = new JustifyTreatmentCommand({
          treatmentId: this.treatmentId,
          observation
        });

        this.store.abandonTreatment(command).subscribe({
          next: () => {
            this.store.loadTreatmentDetailById(this.treatmentId);
          },
          error: (err) => console.error('Error al abandonar:', err)
        });
      }
    });
  }
}
