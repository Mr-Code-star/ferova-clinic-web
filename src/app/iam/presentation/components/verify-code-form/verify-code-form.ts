import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [FormsModule, MatButton],
  selector: 'app-verify-code-form',
  styleUrl: './verify-code-form.css',
  templateUrl: './verify-code-form.html',
})
export class VerifyCodeForm {
  /** Array de 4 dígitos. Cada input maneja un índice. */
  digits: string[] = ['', '', '', ''];

  @Output() submitCode = new EventEmitter<string>();

  @ViewChildren('codeInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  ngAfterViewInit(): void {
    // Autofocus al primer input al cargar
    setTimeout(() => this.inputs.first?.nativeElement.focus());
  }

  /** Al escribir en un input */
  onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(-1); // solo dígitos
    this.digits[index] = value;
    input.value = value;

    // Auto-avanzar al siguiente
    if (value && index < 3) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    }
  }

  /** Al presionar tecla */
  onKeydown(index: number, event: KeyboardEvent): void {
    // Backspace en campo vacío: ir al anterior
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.inputs.get(index - 1)?.nativeElement.focus();
    }

    // Flecha izquierda
    if (event.key === 'ArrowLeft' && index > 0) {
      this.inputs.get(index - 1)?.nativeElement.focus();
      event.preventDefault();
    }

    // Flecha derecha
    if (event.key === 'ArrowRight' && index < 3) {
      this.inputs.get(index + 1)?.nativeElement.focus();
      event.preventDefault();
    }
  }

  /** Al pegar un código completo (ej: "1234") */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const clean = pasted.replace(/\D/g, '').slice(0, 4).split('');

    clean.forEach((digit, i) => {
      this.digits[i] = digit;
      const input = this.inputs.get(i)?.nativeElement;
      if (input) input.value = digit;
    });

    // Focus en el último dígito lleno o el siguiente vacío
    const nextIndex = Math.min(clean.length, 3);
    this.inputs.get(nextIndex)?.nativeElement.focus();
  }

  /** ¿El código está completo? */
  get isValid(): boolean {
    return this.digits.every((d) => d !== '');
  }

  onSubmit(): void {
    if (!this.isValid) return;
    this.submitCode.emit(this.digits.join(''));
  }

  onResend(): void {
    // TODO: emitir evento para reenviar código
    console.log('Reenviar código');
  }
}
