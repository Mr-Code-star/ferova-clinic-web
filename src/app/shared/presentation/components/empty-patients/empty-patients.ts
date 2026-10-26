import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  imports: [MatIcon, MatButton, MatCard, MatCardContent],
  selector: 'app-empty-patients',
  styleUrl: './empty-patients.css',
  templateUrl: './empty-patients.html',
})
export class EmptyPatients {
  private readonly router = inject(Router);

  onAssignClick() {
    void this.router.navigate(['/nurse/patients']);
  }
}
