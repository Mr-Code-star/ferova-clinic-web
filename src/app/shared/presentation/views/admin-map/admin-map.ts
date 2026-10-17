import { Component, signal, computed } from '@angular/core';
import { HeatMap, HealthPost } from '../../../../analytics-reporting/presentation/components/heat-map/heat-map';

type RiskLevel = 'all' | 'critical' | 'moderate' | 'good';

@Component({
  selector: 'app-admin-map',
  standalone: true,
  imports: [HeatMap],
  styleUrl: './admin-map.css',
  templateUrl: './admin-map.html',
})
export class AdminMap {
  // Datos de ejemplo
  readonly posts: HealthPost[] = [
    { id: 1, name: 'Posta Canto Grande', shortName: 'P. Canto Grande', lat: -12.0050, lng: -77.0000, risk: 'good' },
    { id: 2, name: 'Posta Zarate',       shortName: 'P. Zarate',       lat: -12.0150, lng: -76.9980, risk: 'moderate' },
    { id: 3, name: 'Posta San Hilarion', shortName: 'P. San Hilarion', lat: -12.0200, lng: -76.9930, risk: 'critical' },
    { id: 4, name: 'Posta Huascar',      shortName: 'P. Huascar',      lat: -12.0330, lng: -76.9850, risk: 'critical' },
  ];

  activeFilter = signal<RiskLevel>('all');

  filteredPosts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.posts;
    return this.posts.filter(post => post.risk === filter);
  });

  setFilter(filter: RiskLevel): void {
    this.activeFilter.set(filter);
  }
}
