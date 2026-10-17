import { Component, Input } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../../envirotments/environment.development';

export interface HealthPost {
  id: number;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  risk: 'critical' | 'moderate' | 'good';
}

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [GoogleMap, AsyncPipe, MapMarker],
  styleUrl: './heat-map.css',
  templateUrl: './heat-map.html',
})
export class HeatMap {
  apiLoaded: Observable<boolean>;

  center: google.maps.LatLngLiteral = { lat: -12.0124, lng: -76.9984 };
  zoom = 12;

  // Recibimos las postas desde el padre
  @Input() posts: HealthPost[] = [];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(environment.googleMapsApiUrl, 'callback')
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error('Error cargando Google Maps', err);
          return of(false);
        })
      );
  }

  getHeatIcon(risk: string): google.maps.Icon {
    let color = '#0d5c6b';
    if (risk === 'critical') color = '#dc2626';
    if (risk === 'moderate') color = '#f59e0b';
    if (risk === 'good') color = '#10b981';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="2" />
        <circle cx="60" cy="60" r="8" fill="${color}" stroke="#ffffff" stroke-width="2" />
      </svg>
    `;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(120, 120),
      anchor: new google.maps.Point(60, 60),
    };
  }

  getLabelIcon(post: HealthPost): google.maps.MarkerLabel {
    return {
      text: post.shortName,
      color: '#1a202c',
      fontSize: '12px',
      fontWeight: '600',
      className: 'custom-map-label'
    };
  }
}
