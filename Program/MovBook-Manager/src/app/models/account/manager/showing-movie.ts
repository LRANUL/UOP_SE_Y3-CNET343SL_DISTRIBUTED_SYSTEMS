/**
 * MODEL - Showing Movies
 */
 export interface ShowingMovie {
  movieObjectId: String,
  cinemaHallObjectId: String,
  cinemaLocation: {
    cinemaLocationObjectId: String,
    cinemaLocationName: String,
    cinemaLocationAddress: {
      streetAddress: String,
      city: String,
      postalCode: String
    }
  },
  showingStartDate: String,
  showingEndDate: String,
  showingSlots: Array<ShowingSlot>
}

/**
 * MODEL- Showing Movies - Showing Slot
 */
 export interface ShowingSlot {
  showingExperience: String,
  showingDate: String,
  timeSlotStartTime: String,
  timeSlotEndTime: String,
  adultsTicketFeeLKR: String,
  childrenTicketFeeLKR: String
}
