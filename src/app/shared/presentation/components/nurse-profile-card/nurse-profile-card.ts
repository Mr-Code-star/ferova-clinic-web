import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IamStore } from '../../../../iam/application/iam-store';
import { HealthFacilityStore } from '../../../../healthy-facility/application/health-facility-store';

@Component({
  imports: [MatIcon],
  selector: 'app-nurse-profile-card',
  styleUrl: './nurse-profile-card.css',
  templateUrl: './nurse-profile-card.html',
})
export class NurseProfileCard {
  private readonly iamStore = inject(IamStore);
  private readonly facilityStore = inject(HealthFacilityStore);

  protected readonly userName = this.iamStore.fullName;
  protected readonly facility = this.facilityStore.facility;
  protected readonly loading = this.facilityStore.loading;
}
