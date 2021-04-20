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
email : string,
movieTickets : {
 movieObjectId : string,
 childQuantity: string,
 adultQuantity: string,
 posterLink: string,
 title: string,
 timeSlot : string,
 hall: string,
 location: string,
 movieTotal: string,
 seatNumbers : string,
 slotObjectID : string,
 ticketCostLKR : string
},
foodAndBeverages : {
  foodAndBeverageObjectId : string,
  item: any
},
purchaseDate : string,
mealCostLKR : string,
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
