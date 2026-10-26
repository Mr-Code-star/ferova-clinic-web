import {Component, computed, inject, signal} from '@angular/core';
import {HealthFacilityList} from '../../../../healthy-facility/domain/model/health-facility-list.entity';
import {HealthFacilityStore} from '../../../../healthy-facility/application/health-facility-store';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  imports: [
    MatIcon,
    MatButton
  ],
  selector: 'app-admin-posts',
  styleUrl: './admin-posts.css',
  templateUrl: './admin-posts.html',
})
export class AdminPosts {
  private readonly store = inject(HealthFacilityStore);
  private readonly router = inject(Router);

  readonly facilities = this.store.facilitiesList;
  readonly loading = this.store.loading;

  searchTerm = signal<string>('');

  filteredFacilities = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.facilities();
    return this.facilities().filter(f =>
      f.name.toLowerCase().includes(term) ||
      f.address.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.store.loadAllFacilities();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onRegisterFirst() {
    this.router.navigate(['/admin/facilities/register']);
  }

  onAssignNurse(facility: HealthFacilityList) {
    console.log('Asignar enfermero a:', facility.name);
    // Aquí iría la navegación al modal de asignación
  }
}
