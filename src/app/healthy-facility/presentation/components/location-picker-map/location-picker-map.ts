import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import {environment} from '../../../../../environment/environment';

@Component({
  selector: 'app-location-picker-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, AsyncPipe],
  templateUrl: './location-picker-map.html',
  styleUrl: './location-picker-map.css'
})
export class LocationPickerMap implements OnChanges {
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  zoom = 13;
  markerPosition: google.maps.LatLngLiteral | null = null;

  @Input() latitude: number = -12.0464;
  @Input() longitude: number = -77.0428;
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  // ⬇️ Ya NO inicializamos el icono aquí para evitar el error de "google is not defined"
  markerIcon: google.maps.Icon | undefined;

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

    // ⬇️ Esperamos a que la API cargue para crear el icono
    this.apiLoaded.subscribe(loaded => {
      if (loaded) {
        this.markerIcon = {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32)
        };
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.markerPosition = { lat: this.latitude, lng: this.longitude };
      this.center = this.markerPosition;
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.markerPosition = { lat, lng };
      this.center = { lat, lng };

      this.locationSelected.emit({ lat, lng });
    }
  }
}
