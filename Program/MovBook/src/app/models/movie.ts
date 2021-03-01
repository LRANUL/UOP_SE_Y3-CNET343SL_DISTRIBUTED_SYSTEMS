/**
 * MODEL - Movie - MovieResponse
 */
export interface Movie {
  _id?: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
  response: string;
  __v?: number;
}

/**
 * MODEL - MovieResponse
 */
export interface MovieResponse {
  message: string;
  returnedData?: 
  {
    _id?: string;
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: [
      {
        Source: string;
        Value: string;
      }
    ];
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: string;
    __v?: number;
  }
}

/**
 * MODEL - MovieObjectIdResponse
 */
export interface MovieObjectIdResponse {
  message: string;
  returnedData?: [
    {
      _id?: string;
    }
  ]
}
