export type InboxStatusType = 'NO_CONSULTAS' | 'SIN_PACIENTES' | 'BUSQUEDA_SIN_RESULTADOS';

export class InboxStatus {
  private _status: InboxStatusType;
  private _message: string;
  private _detail: string;
  private _searchTerm?: string;
  private _action?: string;

  constructor(data: {
    status: InboxStatusType;
    message: string;
    detail: string;
    searchTerm?: string;
    action?: string;
  }) {
    this._status = data.status;
    this._message = data.message;
    this._detail = data.detail;
    this._searchTerm = data.searchTerm;
    this._action = data.action;
  }

  get status(): InboxStatusType { return this._status; }
  get message(): string { return this._message; }
  get detail(): string { return this._detail; }
  get searchTerm(): string | undefined { return this._searchTerm; }
  get action(): string | undefined { return this._action; }
}
