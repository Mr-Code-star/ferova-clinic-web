import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatCard, MatCardContent, MatIcon, MatButton],
  selector: 'app-empty-pending-consultations',
  styleUrl: './empty-pending-consultations.css',
  templateUrl: './empty-pending-consultations.html',
})
export class EmptyPendingConsultations {
  onRefresh() {}
}
