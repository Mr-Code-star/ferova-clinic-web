import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [Header, MatIcon],
  selector: 'app-recovery-shell',
  styleUrl: './recovery-shell.css',
  templateUrl: './recovery-shell.html',
})
export class RecoveryShell {}
