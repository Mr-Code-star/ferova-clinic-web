import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatCard, MatCardContent, MatIcon, MatButton],
  selector: 'app-empty-consultations',
  styleUrl: './empty-consultations.css',
  templateUrl: './empty-consultations.html',
})
export class EmptyConsultations {

  protected readonly nameSearch = "Nombre de la Busqueda"

  onClearFilter() {

  }
}
