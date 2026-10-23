import { Component } from '@angular/core';
import { NurseProfileCard } from '../../components/nurse-profile-card/nurse-profile-card';
import { PatientCountCard } from '../../../../patients/presentation/components/patient-count-card/patient-count-card';
import { RiskSummaryCard } from '../../../../treatment-tracking/presentation/components/risk-summary-card/risk-summary-card';
import { QuickActionsGrid } from '../../components/quick-actions-grid/quick-actions-grid';
import { DailyAgenda } from '../../../../healthy-facility/presentation/components/daily-agenda/daily-agenda';

@Component({
  imports: [NurseProfileCard, PatientCountCard, RiskSummaryCard, QuickActionsGrid, DailyAgenda],
  selector: 'app-nurse-home',
  styleUrl: './nurse-home.css',
  templateUrl: './nurse-home.html',
})
export class NurseHome {}
