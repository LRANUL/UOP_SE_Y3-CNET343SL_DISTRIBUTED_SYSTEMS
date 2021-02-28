/**
 * MODEL - Ratings - MovieResponse
 */
export interface Ratings{
  Source: string;
  Value: string;
}
/**
 * MODEL - Movie - MovieResponse
 */
export interface Movie {
  _id?: string;
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
    {
      [key: number]: Ratings;
    }
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
  __v?: number;
}
/**
 * MODEL - MovieResponse
 */
export interface MovieResponse {
  message: string;
  returnedData?: [
    {
      [key: number]: Movie;
    }
  ]
}