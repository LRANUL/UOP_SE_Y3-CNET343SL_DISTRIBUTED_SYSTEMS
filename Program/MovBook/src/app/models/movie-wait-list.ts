/**
 * MODAL - Movie Wait List
 */
export interface MovieWaitList {
  _id?: string;
  managerObjectId: string;
  movieObjectId: [string];
  __vv?: number;
}
/**
 * MovieWaitList
 */
export interface MovieWaitListResponse {
  message: string;
  returnedData?: [
    {
      [key: number]: MovieWaitList;
    }
  ];
}