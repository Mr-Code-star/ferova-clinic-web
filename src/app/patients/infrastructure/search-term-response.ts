
export interface SearchResource  {
  motherId: string;
  fullName: string;
  dni: string;
}

export type SearchResponse = SearchResource[];
