/** Interface for Movie documents */
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
/** Interface for location Details */
export interface locationDetails{
  cinemaLocationObjectId : string,
  cinemaLocationName : string,
  cinemaLocationAddress : {
    streetAddress : string,
    city : string,
    postalCode: any
  }
}
/** Interface for Session details */
export interface sessionDetails{
  slotObjectId: string,
  showingDate: string,
  showingExperience: string,
  timeSlotStartTime: string,
  timeSlotEndTime: string,
  adultsTicketFeeLKR: string,
  childrenTicketFeeLKR: string
}
/** Interface for profile details and updates */
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
/** Interface for ticket booking */
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
/** Interface for Booking details for Part 1 */
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
