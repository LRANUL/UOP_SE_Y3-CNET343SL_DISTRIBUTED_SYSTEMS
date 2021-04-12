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
