/**
 * MODEL - Cinema Hall
 */
 export interface CinemaHall {
    cinemaLocationObjectId: string;
    cinemaHallName: string;
    seatingGridNoOfRows: any,
    seatingGridNoOfColumns: any,
    seatingDetails: [{
      seatId: string;
      seatAllocatedPositionNo: string;
      seatNumber: string;
      seatActive: any;
      seatUnavailable: any;
    }
  ]
  }
  
  export interface seating {
      seatId: string;
      seatAllocatedPositionNo: string;
      seatNumber: string;
      seatActive: any;
      seatUnavailable: any;
  }
  
  export interface showingCinemaHall{
    showingCinemaHallObjectId: String;
    slotObjectId: string;
    showingMovieObjectId: string;
    cinemaHallObjectID: string;
    cinemaLocationObjectId : string;
    showingSeatDetails : [
      {
        seatObjectId: string,
        seatId : any;
        seatNumber: string;
        seatUnavailable: string;
        seatStatus : string;
        seatActive : string;
        customerObjectId : string;
      }
    ]
  }
  
  export interface seatingData {
    seatObjectId: string,
    seatId: string,
    seatNumber: string,
    seatUnavailable: string,
    seatStatus : string,
    seatActive: string,
    customerObjectId: string
  }
  
  /**
 * MODEL - Cinema Location
 */
 export interface CinemaLocation {
    cinemaLocationName: string;
    locationAddressStreetAddress: {
      streetAddress: String,
      city: String,
      postalCode: String
    }
  }

  export interface movie {
    id? : string,
    movieObjectId: string,
    cinemaHallObjectId: string,
    cinemaLocation: {
    cinemaLocationObjectId : string,
    cinemaLocationName : string,
    cinemaLocationAddress : {
      streetAddress : string,
      city : string,
      postalCode: string,
    }
  },
    showingStartDate: string,
    showingEndDate: string,
    showingSlots: [{
    _id: string,
    showingExperience: string,
    showingDate: string,
    timeSlotStartTime: string,
    timeSlotEndTime: string,
    adultsTicketFeeLKR: string,
    childrenTicketFeeLKR: string
  }]
  }
  
  export interface locationDetails{
    cinemaLocationObjectId : string,
    cinemaLocationName : string,
    cinemaLocationAddress : {
      streetAddress : string,
      city : string,
      postalCode: any
    }
  }
  
  export interface sessionDetails{
    slotObjectId: string,
    showingDate: string,
    showingExperience: string,
    timeSlotStartTime: string,
    timeSlotEndTime: string,
    adultsTicketFeeLKR: string,
    childrenTicketFeeLKR: string
  }
  
  export interface profile{
    id?: string,
    name:
      {
      prefix: string,
      lastName: string,
      firstName: string,
      middleName: string,
      },
    email: string,
    password: string,
    registeredDateTime: string,
    address:
      {
      streetAddress: string,
      city: string,
      postalZipCode: string
      },
    phone: string,
  }
  
  export interface bookedTickets
  {
  customerObjectId : string,
  movieTickets : {
   movieObjectId : string,
   movieName: string,
   moviePoster: string,
   seatNumber : string,
   hallName: string,
   location: string,
   hallId : string,
   timeSlot : string,
   date : string,
   ticketCostLKR : string
  },
  foodAndBeverages : {
    foodAndBeverageObjectId : string,
    quantity : string,
    mealCostLKR : string
  },
  totalCostLKR : string
  }
  
  export interface bookedTicketsDetails{
  location : string,
  hall : string,
  movieName : string,
  moviePoster : any,
  seatNumber : string,
  date : string,
  timeSlot : string,
  ticketCostLKR : string
  mealCostLKR : string
  totalCostLKR : string
  }
  
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
  
  export interface CinemaExperience {
    showingExperience: string,
    description: string
  }
  
  