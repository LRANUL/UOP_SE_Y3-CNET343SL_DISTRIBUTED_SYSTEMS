import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { movie } from 'src/app/models/account/customers';

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
    cinemalocationObjectId: '',
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


getUser(id:string) 
{
  return this.http.get<{message: string, users}>('http://localhost:5000/api/users/' + id)
}

updateuser(value, id)
{
  this.http.put<{message: string}>('http://localhost:5000/api/users/' + id, value).subscribe((responsestatus) => {
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

getmoviedetails(id: string)
{
  return this.http.get<{tickets:movie}>('http://localhost:5000/api/booking-details/' + id).subscribe(res=>{
    this.moviesUpdated = res.tickets;
    this.currentmovies.next(this.moviesUpdated);
  })
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
  return this.http.get<{message : string, tickets : any}>('http://localhost:5000/api/booking-details/experience/location/' + location).subscribe(res=>{
  this.moviesUpdated= res.tickets;
  this.currentmovies.next(this.moviesUpdated);
})
}

}
