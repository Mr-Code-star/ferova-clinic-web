export class HealthFacilityList {
  private _id: string;
  private _name: string;
  private _address: string;
  private _assignedNurseName: string | null;
  private _hasNurseAssigned: boolean;
  private _displayMessage: string | null;

  constructor(data: {
    id: string;
    name: string;
    address: string;
    assignedNurseName: string | null;
    hasNurseAssigned: boolean;
    displayMessage: string | null;
  }) {
    this._id = data.id;
    this._name = data.name;
    this._address = data.address;
    this._assignedNurseName = data.assignedNurseName;
    this._hasNurseAssigned = data.hasNurseAssigned;
    this._displayMessage = data.displayMessage;
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get address(): string { return this._address; }
  get assignedNurseName(): string | null { return this._assignedNurseName; }
  get hasNurseAssigned(): boolean { return this._hasNurseAssigned; }
  get displayMessage(): string | null { return this._displayMessage; }
}
