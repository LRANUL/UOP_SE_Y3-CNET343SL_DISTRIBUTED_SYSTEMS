export interface movie {
  id? : string,
  movieObjectId: string,
  cinemaHallObjectId: string,
  cinemaLocationObjectId: string,
  showingExperience: string,
  showingStartDate: string,
  showingEndDate: string,
  showingTime: string,
  cinemaLocationName : string,
  cinemaLocationAddress : {
    streetAddress : string,
    city : string,
    postalCode: any
  }
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
