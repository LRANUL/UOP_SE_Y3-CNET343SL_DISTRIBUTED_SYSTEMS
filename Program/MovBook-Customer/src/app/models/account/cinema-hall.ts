/**
 * MODEL - Cinema Hall
 */
export interface CinemaHall {
  cinemaLocationObjectId: string;
  hallName: string;
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
