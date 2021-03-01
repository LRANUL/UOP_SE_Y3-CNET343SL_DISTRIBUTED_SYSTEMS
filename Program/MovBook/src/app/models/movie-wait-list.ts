/**
 * MovieWaitListResponse
 */
export interface MovieWaitListResponse {
  message: string;
  returnedData?: [
    {
      _id?: string;
      managerObjectId: string;
      movieObjectId: [string];
      __vv?: number;
    }
  ]
}
/**
 * MovieWaitList
 */
export interface MovieWaitList {
  managerObjectId: string;
  movieObjectId: [string];
}
/**
 * AddMovieToMovieWaitList
 */
export interface AddMovieToMovieWaitList {
  managerObjectId: string;
  movieObjectId: string;
}
