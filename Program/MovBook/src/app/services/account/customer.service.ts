import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { movie} from 'src/app/models/account/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public updatedBookedtickets:[] = [];
  private currentBookedtickets = new Subject();
  
  gettickets(){
    return this.currentBookedtickets.asObservable();
  }

  public moviesUpdated = {
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemaLocationObjectId: '',
    showingExperience: '',
    showingStartDate: '',
    showingEndDate: '',
    showingTime: ''
  };
  private currentmovies = new Subject();
  
  getmovie()
  {
    return this.currentmovies.asObservable();
  }

  public locationupdated = {
    cinemaLocationName: '',
    cinemaLocationAddress: {
    streetAddress: '',
    city: '',
    postalCode: ''
    }
  };

  private location = new Subject();
  
  getlocation()
  {
    return this.location.asObservable();
  }

  public hallupdated = {
    cinemaLocationObjectId: '',
    cinemaHallName: '',
    seatingGridNoOfRows: '',
    seatingGridNoOfColumns: '',
    seatingDetails: [{
      seatId:  '',
      seatAllocatedPositionNo: '',
      seatActive: '',
      seatNumber: '',
      seatUnavailable: ''
    }]
  };
  private hall = new Subject();
  
  gethall()
  {
    return this.hall.asObservable();
  }

 
getUser(id:string) 
{
  return this.http.get<{message: string, users: any}>('http://localhost:5000/api/customers/' + id)
}

updateuser(value, id)
{
  console.log(value);
  this.http.put<{message: string}>('http://localhost:5000/api/customers/' + id, value).subscribe((responsestatus) => {
    console.log(responsestatus);
});   
}

getloyality(email:string)
{
  return this.http.get<{message: string, users}>('http://localhost:5000/api/loyalty/' + email)
}

getbookinghistory(email: string)
{
  return this.http.get<{message : string, tickets : any}>('http://localhost:5000/api/booking-history/' + email).subscribe(res=>{
  this.updatedBookedtickets= res.tickets;
  this.currentBookedtickets.next([...this.updatedBookedtickets]);
})
}

getshowingmoviedetails(id: string)
{
  return this.http.get<{tickets:movie}>('http://localhost:5000/api/booking-details/' + id).subscribe(res=>{
    this.moviesUpdated = res.tickets;
    this.currentmovies.next(this.moviesUpdated);
  })
}

retrieveCinemaHall(cinemaLocationObjectId){
  return this.http.get<{message: string, returnedData: any}>('http://localhost:5000/api/cinema-halls/hall/' + cinemaLocationObjectId).subscribe(res=>{
    this.hallupdated = res.returnedData;
    this.hall.next([this.hallupdated]);
  });;
}

retrieveCinemaLocation(cinemaLocationObjectId){ 
  return this.http.get<{message: string, returnedData: any}>('http://localhost:5000/api/cinema-locations/location/' + cinemaLocationObjectId).subscribe(res=>{
    this.locationupdated = res.returnedData;
    this.location.next([this.locationupdated]);
  });
}

retrieveAllCinemaLocations(){
  return this.http.get("http://localhost:5000/api/cinema-locations");
}

getmoviedetails(id: string)
{
  // have to write the code to get the movie here
}

getmovieexperience(exp: string)
{
  return this.http.get<{message : string, tickets : any}>('http://localhost:5000/api/booking-details/experience/' + exp).subscribe(res=>{
  this.moviesUpdated= res.tickets;
  this.currentmovies.next(this.moviesUpdated);
})
}

getmovielocation(location: string)
{
  return this.http.get<{message : string, returnedData : any}>('http://localhost:5000/api/cinema-locations/find/location/' + location).subscribe(res=>{
    this.locationupdated= res.returnedData;
    this.location.next(this.locationupdated);
  });
}

}
