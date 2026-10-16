import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../envirotments/environment.development';
import { UserResource } from './users-response';

const usersUrl = `${environment.serverBasePath}${environment.usersEndpointPath}`;

@Injectable({ providedIn: 'root' })
export class UserApiEndpoint {

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /users/{id}
   */
  getUserById(id: string): Observable<UserResource> {
    return this.http.get<UserResource>(`${usersUrl}/${id}`);
  }
}
