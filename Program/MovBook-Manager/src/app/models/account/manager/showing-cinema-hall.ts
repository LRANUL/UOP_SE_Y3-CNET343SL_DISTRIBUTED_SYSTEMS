/**
 * MODEL - Showing Cinema Halls List
 */
export interface ShowingCinemaHallList {
  showingCinemaHallList: Array<ShowingCinemaHall>
}

/**
 * MODEL- Showing Cinema Halls List - Showing Cinema Halls
 */
export interface ShowingCinemaHall {
  slotObjectId: String,
  showingMovieObjectId: String,
  cinemaHallObjectId: String,
  cinemaLocationObjectId: String,
  showingSeatDetails: Array<ShowingSeatDetails>
}

/**
 * MODEL- Showing Cinema Halls List - Showing Cinema Halls - Showing Seat Details
 */
export interface ShowingSeatDetails {
  showingSeatDetails: {
    seatId: String,
    seatActive: String,
    seatNumber: String,
    seatUnavailable: String,
    seatStatus: String,
    customerObjectId: String,
  }
}
