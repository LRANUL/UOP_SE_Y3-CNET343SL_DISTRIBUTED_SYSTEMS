export interface movie {
  id? : string,
  movieObjectId: string,
  cinemaHallObjectId: string,
  cinemaLocationObjectId: string,
  showingExperience: string,
  showingStartDate: string,
  showingEndDate: string,
  showingTime: string
}

export interface profile{
    id?: string,
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    NIC: string,
    address: string,
    phone: string,
  }