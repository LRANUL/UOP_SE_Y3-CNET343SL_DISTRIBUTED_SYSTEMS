//might have to remove this
export interface CinemaHall
{
    cinemaLocationObjectId: String,
    cinemaHallName: String,
    seatingGridNoOfRows: Number,
    seatingGridNoOfColumns: Number,
    seatingDetails: [{
      seatId:  String,
      seatAllocatedPositionNo:  String,
      seatActive: Boolean,
      seatNumber: String,
      seatUnavailable: Boolean
    }]
}