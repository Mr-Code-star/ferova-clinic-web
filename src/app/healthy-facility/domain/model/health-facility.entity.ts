import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class HealthFacility implements BaseEntity{
  private _facilityId: string;
  private _facilityName: string;
  private _address: string;
  private _districtId: string;
  private _districtName: string;
  private _latitude: number;
  private _longitude: number;
  private _phoneNumber: string;
  private _status: string;
  private _services: string[];
  private _availableDays: string[];
  private _availableSlots: string[];
  private _scheduleOfOperation: string;

  constructor(data: {
    facilityId: string;
    facilityName: string;
    address: string;
    districtId?: string;
    districtName?: string;
    latitude?: number;
    longitude?: number;
    phoneNumber: string;
    status?: string;
    services: string[];
    availableDays?: string[];
    availableSlots?: string[];
    scheduleOfOperation?: string;
  }) {
    this._facilityId = data.facilityId;
    this._facilityName = data.facilityName;
    this._address = data.address;
    this._districtId = data.districtId ?? '';
    this._districtName = data.districtName ?? '';
    this._latitude = data.latitude ?? 0;
    this._longitude = data.longitude ?? 0;
    this._phoneNumber = data.phoneNumber;
    this._status = data.status ?? 'ACTIVE';
    this._services = data.services;
    this._availableDays = data.availableDays ?? [];
    this._availableSlots = data.availableSlots ?? [];
    this._scheduleOfOperation = data.scheduleOfOperation ?? '';
  }

  get id(): string { return this._facilityId; }
  get facilityId(): string { return this._facilityId; }
  get facilityName(): string { return this._facilityName; }
  get address(): string { return this._address; }
  get districtId(): string { return this._districtId; }
  get districtName(): string { return this._districtName; }
  get latitude(): number { return this._latitude; }
  get longitude(): number { return this._longitude; }
  get phoneNumber(): string { return this._phoneNumber; }
  get status(): string { return this._status; }
  get services(): string[] { return this._services; }
  get availableDays(): string[] { return this._availableDays; }
  get availableSlots(): string[] { return this._availableSlots; }
  get scheduleOfOperation(): string { return this._scheduleOfOperation; }

  // Setters opcionales por si necesitas modificarlos
  set facilityName(value: string) { this._facilityName = value; }
  set services(value: string[]) { this._services = value; }

}
