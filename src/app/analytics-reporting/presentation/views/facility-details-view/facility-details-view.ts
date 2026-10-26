import {Component, computed, inject, OnInit} from '@angular/core';
import {AdminDashboardStore} from '../../../application/admin-dashboard.store';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {FacilityReportPdfService} from '../../../application/facility-report-pdf.service';

@Component({
  imports: [
    MatIcon,
    MatButton
  ],
  selector: 'app-facility-details-view',
  styleUrl: './facility-details-view.css',
  templateUrl: './facility-details-view.html',
})
export class FacilityDetailsView implements OnInit {
  private readonly store = inject(AdminDashboardStore);
  private readonly router = inject(Router);
  private readonly pdfService = inject(FacilityReportPdfService);

  readonly facilities = this.store.allFacilities;
  readonly summary = this.store.summary;
  readonly loading = this.store.loading;

  // Computed para agrupar por rendimiento
  counters = computed(() => {
    const list = this.facilities();
    return {
      low: list.filter(f => f.adherenceRate < 50).length,
      medium: list.filter(f => f.adherenceRate >= 50 && f.adherenceRate < 80).length,
      high: list.filter(f => f.adherenceRate >= 80).length,
      total: list.length
    };
  });

  ngOnInit(): void {
    this.store.loadAllFacilities();
  }

  onBack() {
    this.router.navigate(['/admin/home']);
  }

  onExport() {
    // Validación: Solo exportar si hay datos
    if (this.facilities().length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    // Llamamos al servicio
    this.pdfService.downloadFacilityReport(
      this.facilities(),
      this.summary()
    );
  }
}
