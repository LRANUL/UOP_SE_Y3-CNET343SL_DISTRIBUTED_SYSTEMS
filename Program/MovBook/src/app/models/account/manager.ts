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
    {[key: number]: Search;}
  ];
  totalResults: string;
}

/**
 * MODEL - Ratings - Movie Details
 */
export interface Ratings{
  Source: string;
  Value: string;
}
/**
 * MODEL - Movie Details
 */
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {[key: number]: Ratings}
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

/**
 * MODEL- Hall Seating
 */
export interface HallSeatDetails {
  seatId: string;
  seatAllocatedPositionNo: string;
  seatNumber: string;
  seatActive: Boolean;
  seatUnavailable: Boolean;
}

/**
 * MODEL - Cinema Hall 
 */
export interface CinemaHall {
  cinemaLocationObjectId: string;
  hallName: string;
  noOfRows: number;
  noOfColumns: number;
  seatingDetails: Array<HallSeatDetails>;
}

/**
 * MODEL - Cinema Location
 */
export interface CinemaLocation {
  locationName: string;
  locationAddressStreetAddress: string;
  locationAddressCity: string;
  locationAddressPostalCode: number;
}