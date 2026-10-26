import { Component, Input } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { HeatMap as HeatMapEntity } from '../../../../analytics-reporting/domain/model/heat-map.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';



@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [GoogleMap, AsyncPipe, MapMarker],
  styleUrl: './heat-map.css',
  templateUrl: './heat-map.html',
})
export class HeatMap {
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  zoom = 11;

  /** Puntos recibidos desde el padre (ya filtrados) */
  @Input() points: HeatMapEntity[] = [];

  constructor(httpClient: HttpClient) {
    console.log('MAPS URL:', environment.googleMapsApiUrl);
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

  private getRiskColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'HIGH':   return '#dc2626';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW':    return '#10b981';
      default:       return '#0d5c6b';
    }
  }

  getHeatIcon(riskLevel: string): google.maps.Icon {
    const color = this.getRiskColor(riskLevel);

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

  getLabelIcon(point: HeatMapEntity): google.maps.MarkerLabel {
    return {
      text: point.name,
      color: '#1a202c',
      fontSize: '12px',
      fontWeight: '600',
      className: 'custom-map-label',
    };
  }

}
