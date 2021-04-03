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
  movieShowingObjectId : String;
  cinemaHallObjectId : string;
  cinemaLocationObjectId : string;
  showingSeatDetails : [
    {
      seatId : any;
      seatNumber: string;
      seatUnavailable: string;
      seatStatus : string;
      seatType : string;
      customerObjectId : string;
    }
  ]
}

export interface seatingData {
  seatId: string,
  seatNumber: string,
  seatUnavailable: string,
  seatStatus : string,
  seatType: string,
  customerObjectId: string
}
