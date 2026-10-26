import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FacilityStatus } from '../domain/model/facility-status.entity';
import { AdminDashboardSummary } from '../domain/model/admin-dashboard-summary.entity';

@Injectable({ providedIn: 'root' })
export class FacilityReportPdfService {

  downloadFacilityReport(facilities: FacilityStatus[], summary: AdminDashboardSummary | null): void {
    const doc = new jsPDF();

    // 1. Cabecera
    let y = this.header(doc, 'Reporte de Adherencia por Establecimiento');

    // 2. Resumen Global
    if (summary) {
      autoTable(doc, {
        startY: y,
        head: [['Resumen Global', 'Valor']],
        body: [
          ['Adherencia Global', `${summary.globalAdherenceRate}%`],
          ['Postas Activas', summary.totalActiveFacilities],
          ['Postas Críticas', summary.totalCriticalFacilities],
          ['Total Establecimientos', facilities.length],
        ],
      });
      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // 3. Tabla de Establecimientos
    const bodyData = facilities.map(f => [
      f.facilityName,
      f.districtName,
      `${f.adherenceRate}%`,
      this.getRiskLabel(f.riskLevel),
      f.totalPatients,
      f.totalConfirmed,
      f.totalOmitted
    ]);

    autoTable(doc, {
      startY: y,
      head: [['Establecimiento', 'Distrito', 'Adherencia', 'Riesgo', 'Pacientes', 'Confirmadas', 'Omitidas']],
      body: bodyData,
      theme: 'striped',
      headStyles: { fillColor: [15, 59, 92] }, // Azul oscuro FerovaClinic
    });

    // 4. Guardar archivo
    doc.save(`reporte-postas-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  private header(doc: jsPDF, title: string): number {
    doc.setFontSize(18);
    doc.setTextColor(15, 59, 92);
    doc.text(title, 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}`, 14, 26);
    doc.text('Sistema FerovaClinic - MINSA', 14, 31);

    return 40;
  }

  private getRiskLabel(risk: string): string {
    switch (risk) {
      case 'HIGH': return 'Crítico';
      case 'MEDIUM': return 'En Seguimiento';
      case 'LOW': return 'Óptimo';
      default: return risk;
    }
  }
}
