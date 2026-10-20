import { HttpClient } from '@angular/common/http';
import { environment } from '../../../envirotments/environment.development';
import { SearchTermAssembler } from './search-term-assembler';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { catchError, map, Observable } from 'rxjs';
import { SearchResource, SearchResponse } from './search-term-response';

const searchTermUrl = `${environment.serverBasePath}${environment.patientEndpointPath}/mother/search`;

export class SearchTermApiEndpoint extends ErrorHandlingEnabledBaseType{
  private readonly assembler = new SearchTermAssembler();

  constructor(private http: HttpClient) {
    super();
  }


  /**
   * GET /patients/mother/search/{dni}
   */
  searchByMotherDni(dni: string): Observable<SearchResource[]> {
    return this.http.get<SearchResponse>(`${searchTermUrl}/${dni}`).pipe(
      map(response => this.assembler.toResourcesFromResponse(response)),
      catchError(this.handleError('Failed to search patient by mother DNI'))
    );
  }

}
