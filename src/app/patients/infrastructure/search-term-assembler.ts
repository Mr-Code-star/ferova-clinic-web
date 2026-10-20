import { SearchResource, SearchResponse } from './search-term-response';

export class SearchTermAssembler {
  /**
   * Mapea la respuesta del backend (un array) a un array de recursos.
   * O si tienes una entidad de dominio "PatientSearchResult", aquí la crearías.
   */
  toResourcesFromResponse(response: SearchResponse): SearchResource[] {
    return response.map(res => ({
      motherId: res.motherId,
      fullName: res.fullName,
      dni: res.dni
    }));
  }
}
