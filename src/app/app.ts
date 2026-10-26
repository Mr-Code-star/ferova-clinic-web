import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayout } from './shared/presentation/components/admin-layout/admin-layout';

@Component({
  imports: [RouterOutlet, AdminLayout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ferova-clinic-web');
}
