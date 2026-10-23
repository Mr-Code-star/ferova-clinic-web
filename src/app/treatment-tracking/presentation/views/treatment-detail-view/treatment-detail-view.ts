import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentTrackingStore } from '../../../application/treatment-tracking-store';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  imports: [MatIcon, NgClass],
  selector: 'app-treatment-detail-view',
  styleUrl: './treatment-detail-view.css',
  templateUrl: './treatment-detail-view.html',
})
export class TreatmentDetailView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TreatmentTrackingStore);

  readonly detail = this.store.treatmentDetail;
  readonly loading = this.store.loading;

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id') || '';
    if (patientId) {
      this.store.loadTreatmentDetail(patientId);
      this.store.loadWeeklyAdherence(patientId);
      this.store.loadNextDose(patientId);
    }
  }
  readonly weeklyAdherence = this.store.weeklyAdherence;
  readonly nextDose = this.store.nextDose;

  onBack() {
    this.router.navigate(['/nurse/home']);
  }
}
