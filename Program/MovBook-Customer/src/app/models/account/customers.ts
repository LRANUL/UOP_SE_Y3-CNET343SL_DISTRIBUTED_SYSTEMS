export interface movie {
  id? : string,
  movieObjectId: string,
  cinemaHallObjectId: string,
  cinemaLocationObjectId: string,
  showingExperience: string,
  showingStartDate: string,
  showingEndDate: string,
  showingTime: string,
  cinemaLocationName : string,
  cinemaLocationAddress : {
    streetAddress : string,
    city : string,
    postalCode: any
  }
}

export interface profile{
    id?: string,
    name:
    [
      {
      prefix: string,
      lastName: string,
      firstName: string,
      middleName: string,
      }
    ],
    email: string,
    password: string,
    registeredDateTime: string,
    address:
    [
      {
      streetAddress: string,
      city: string,
      postalZipCode: string
      }
    ],
    phone: string,
}
