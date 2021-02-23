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
 * MODEL- Hall Seating
 */
export interface HallSeatDetails {
  seatId: string;
  seatNumber: string;
  seatActive: Boolean;
  seatUnavailable: Boolean;
}

/**
 * MODEL - Cinema Hall 
 */
export interface CinemaHall {
  hallName: string;
  noOfRows: number;
  noOfColumns: number;
  seatingDetails: Array<HallSeatDetails>
}

/**
 * MODEL - Cinema Location
 */
export interface CinemaLocation {
  locationName: string;
  locationAddressStreetAddress: string,
  locationAddressCity: string,
  locationAddressPostalCode: number
}