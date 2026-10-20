import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatIcon, FormsModule, MatButton],
  selector: 'app-mother-search-form',
  styleUrl: './mother-search-form.css',
  templateUrl: './mother-search-form.html',
})
export class MotherSearchForm {
  @Input() loading: boolean = false;
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  // Filtra solo números en tiempo real
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    // Reemplaza cualquier caracter que no sea un número del 0 al 9
    const cleanValue = input.value.replace(/[^0-9]/g, '');
    this.searchTerm = cleanValue;
    input.value = cleanValue;
  }

  // Permite buscar con cualquier cantidad de dígitos (mientras no esté vacío)
  onSearch() {
    if (!this.searchTerm.trim() || this.loading) return;
    this.search.emit(this.searchTerm.trim());
  }

  onClear() {
    this.searchTerm = '';
  }
}
