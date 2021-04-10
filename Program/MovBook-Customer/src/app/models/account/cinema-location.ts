/**
 * MODEL - Cinema Location
 */
 export interface CinemaLocation {
  cinemaLocationName: string;
  locationAddressStreetAddress: {
    streetAddress: String,
    city: String,
    postalCode: String
  }
}
