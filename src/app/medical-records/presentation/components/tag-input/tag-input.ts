import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddAntecedenteModal } from '../add-antecedente-modal/add-antecedente-modal';
import { AddSintomaModal } from '../add-sintoma-modal/add-sintoma-modal';

@Component({
  selector: 'app-tag-input',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.css'
})
export class TagInput {
  @Input() label: string = '';
  @Input() tags: string[] = [];
  @Input() type: 'antecedente' | 'sintoma' = 'antecedente'; // ⬅️ NUEVO: para saber qué modal abrir

  @Output() tagsChange = new EventEmitter<string[]>();

  private readonly dialog = inject(MatDialog);

  openModal() {
    if (this.type === 'antecedente') {
      const dialogRef = this.dialog.open(AddAntecedenteModal, {
        width: '500px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Formato: "TIPO: descripción"
          const tagString = `${result.type}: ${result.description}`;
          this.tagsChange.emit([...this.tags, tagString]);
        }
      });
    } else {
      const dialogRef = this.dialog.open(AddSintomaModal, {
        width: '500px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.tagsChange.emit([...this.tags, result]);
        }
      });
    }
  }

  removeTag(index: number) {
    const updatedTags = this.tags.filter((_, i) => i !== index);
    this.tagsChange.emit(updatedTags);
  }
}
