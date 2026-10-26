import {Component, inject} from '@angular/core';
import {IamStore} from '../../../../iam/application/iam-store';

@Component({
  imports: [],
  selector: 'app-admin-welcome-header',
  styleUrl: './admin-welcome-header.css',
  templateUrl: './admin-welcome-header.html',
})
export class AdminWelcomeHeader {
  private readonly iamStore = inject(IamStore);

  readonly userName = this.iamStore.fullName;
  readonly currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}
