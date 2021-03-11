/**
 * MODEL - Search - Movie Search Results
 */
export interface Search {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
/**
 * MODEL - Movie Search Results
 */
export interface MovieSearchResult {
  Response: string;
  Search: [
    {
      [key: number]: Search;
    }
  ];
  totalResults: string;
}



