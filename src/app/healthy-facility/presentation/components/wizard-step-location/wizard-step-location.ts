import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LocationPickerMap} from '../location-picker-map/location-picker-map';

@Component({
  selector: 'app-wizard-step-location',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationPickerMap],
  templateUrl: './wizard-step-location.html',
  styleUrl: './wizard-step-location.css'
})
export class WizardStepLocation implements OnInit {
  @Input() data: any = { latitude: 0, longitude: 0 };
  @Output() dataChange = new EventEmitter<any>();

  ngOnInit() {
    if (!this.data.latitude) {
      // Coordenadas por defecto (Lima, Perú)
      this.data = { ...this.data, latitude: -12.0464, longitude: -77.0428 };
      this.dataChange.emit(this.data);
    }
  }

  onInput(field: string, value: number) {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
  }

  onLocationSelected(position: { lat: number; lng: number }) {
    this.data = { ...this.data, latitude: position.lat, longitude: position.lng };
    this.dataChange.emit(this.data);
  }
}
