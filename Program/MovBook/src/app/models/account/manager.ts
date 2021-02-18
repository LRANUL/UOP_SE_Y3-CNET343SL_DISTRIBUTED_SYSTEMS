/**
 * MODEL - Movie Search Results
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
    {[key: number]: Search;}
  ];
  totalResults: string;
}

/**
 * Hall Seating Object
 */
export interface HallSeatDetails {
  seatId: string;
  seatNumber: string;
  seatActive: Boolean;
  seatUnavailable: Boolean;
}