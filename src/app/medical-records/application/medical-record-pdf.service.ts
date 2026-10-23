import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { ControlHistoryResponse } from '../infrastructure/control-history-reponse';

const ANEMIA_TEXT: Record<string, string> = {
  CONTROLLED: 'Controlada',
  MILD: 'Leve',
  MODERATE: 'Moderada',
  SEVERE: 'Grave',
};

@Injectable({ providedIn: 'root' })
export class MedicalRecordPdfService {
  downloadMedicalRecord(record: MedicalRecord, patientName: string): void {
    const doc = new jsPDF();
    let y = this.header(doc, 'Historial Médico', `Paciente: ${patientName}`);

    autoTable(doc, {
      startY: y,
      head: [['Dato', 'Valor']],
      body: [
        ['Última actualización', this.fmt(record.updatedAt)],
        ['Sexo', record.gender === 'MALE' ? 'Masculino' : 'Femenino'],
        ['Peso', `${record.weight} kg`],
        ['Altura', `${record.height} cm`],
        ['Hemoglobina', record.hemoglobinLevel != null ? `${record.hemoglobinLevel} g/dL` : 'Sin registros'],
      ],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [['Motivo de consulta']],
      body: [[record.motivoConsulta || '-']],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [['Observaciones']],
      body: [[record.observaciones || '-']],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [['Antecedente', 'Descripción']],
      body: record.antecedentes.length
        ? record.antecedentes.map(a => [a.type, a.description])
        : [['-', 'Sin antecedentes']],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [['Síntomas actuales']],
      body: record.sintomas.length ? record.sintomas.map(s => [s]) : [['Sin síntomas']],
    });

    if (record.controls.length) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 8,
        head: [['Fecha', 'Hemoglobina (g/dL)', 'Estado']],
        body: record.controls.map(c => [
          this.fmt(c.date),
          c.hemoglobinLevel ?? '-',
          ANEMIA_TEXT[c.anemiaStatus] ?? c.anemiaStatus,
        ]),
      });
    }

    doc.save(`historial-medico-${this.slug(patientName)}.pdf`);
  }

  downloadControlHistory(history: ControlHistoryResponse, patientName: string): void {
    const doc = new jsPDF();
    const name = history.patientName || patientName;
    const y = this.header(doc, 'Historial de Controles de Hemoglobina', `Paciente: ${name}`);

    autoTable(doc, {
      startY: y,
      head: [['Resumen', 'Valor']],
      body: [
        ['Total de controles', history.totalControls],
        ['Promedio', `${history.averageHemoglobin} g/dL`],
        ['Evolución', `${history.evolution > 0 ? '+' : ''}${history.evolution} g/dL`],
      ],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [['Fecha', 'Hemoglobina (g/dL)', 'Estado']],
      body: history.controls.map(c => [
        this.fmt(c.date),
        c.hemoglobinLevel,
        ANEMIA_TEXT[c.anemiaStatus] ?? c.anemiaStatus,
      ]),
    });

    doc.save(`controles-hemoglobina-${this.slug(name)}.pdf`);
  }

  private header(doc: jsPDF, title: string, subtitle: string): number {
    doc.setFontSize(18);
    doc.text(title, 14, 18);
    doc.setFontSize(11);
    doc.text(subtitle, 14, 26);
    doc.text(`Generado: ${this.fmt(new Date().toISOString())}`, 14, 32);
    return 38;
  }

  private fmt(date: string): string {
    return new Date(date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private slug(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
}
