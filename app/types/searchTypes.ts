export interface SearchResult {
  id: number;
  title: string;
}

export interface SearchParams {
  q?: string;
  isSoldOut?: string;
  minPrice?: string;
  maxPrice?: string;
}