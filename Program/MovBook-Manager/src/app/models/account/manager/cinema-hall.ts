/**
 * MODEL- Hall Seating
 */
 export interface HallSeatDetails {
  seatId: string;
  seatAllocatedPositionNo: string;
  seatNumber: string;
  seatActive: Boolean;
  seatUnavailable: Boolean;
}

/**
 * MODEL - Cinema Hall 
 */
export interface CinemaHall {
  cinemaLocationObjectId: string;
  hallName: string;
  noOfRows: number;
  noOfColumns: number;
  seatingDetails: Array<HallSeatDetails>;
}