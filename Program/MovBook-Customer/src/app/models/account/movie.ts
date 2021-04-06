/**
 * MODEL - Movie - MovieResponse
 */
export interface Movie {
  _id?: string;
  movieStatus: string;
  movieTitle: string;
  rated: string;
  releasedYear: string;
  releasedDate: string;
  movieRuntime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  posterLink: string;
  ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  imdb: {
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
  }
  boxOffice: string;
  production: string;
  website: string;
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

export interface ticketPrices{
  movieObjectId: String,
  showingTimeSlot:  String,
  ticketCost: {
    adult: any,
    children: any,
  }
}
