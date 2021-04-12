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
