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

  public movieupdated = {
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    poster: '',
    ratings: [{
      Source: '',
      Value: ''
    }],
    metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbId: '',
    type: '',
    dvd: '',
    boxOffice: '',
    production: '',
    website: ''
    };
    private movie = new Subject();

    getmovies()
    {
      return this.movie.asObservable();
    }

    public movieShowingUpdated = {
      movieObjectId: '',
      cinemaHallObjectId: '',
      cinemaLocationObjectId: '',
      showingExperience: '',
      showingStartDate: '',
      showingEndDate: '',
      showingTime: ''
      };
      private Showingmovie = new Subject();

      getShowingMovie()
      {
        return this.Showingmovie.asObservable();
      }

      public ticketPricesUpdated = {
        movieObjectId: '',
        showingTimeSlot:  '',
        ticketCost: {
        adult: '',
        children: '',
        }
        };
        private ticketPrice = new Subject();

        getTicket()
        {
          return this.ticketPrice.asObservable();
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

getShowingMovies()
{
  return this.http.get<{message : string, returnedData : any}>('http://localhost:5000/api/movies').subscribe(res=>{
    this.movieupdated= res.returnedData;
    this.movie.next(this.movieupdated);
 });
}

getSpecificShowingMovie(showingId: string)
{
  return this.http.get<{message : string, tickets : any}>('http://localhost:5000/api/booking-details/id/' + showingId).subscribe(res=>{
    this.movieShowingUpdated = res.tickets;
    this.Showingmovie.next(this.movieShowingUpdated);
 });
}

getMovieDetail(movieId)
{
  return this.http.get<{message : string, returnedData : any}>('http://localhost:5000/api/movies/' + movieId).subscribe(res=>{
    this.movieupdated= res.returnedData;
    this.movie.next(this.movieupdated);
 });
}

getTicketPrice(movieId: string)
{
  return this.http.get<{message : string, tickets : any}>('http://localhost:5000/api/ticket-prices/' + movieId).subscribe(res=>{
    this.ticketPricesUpdated = res.tickets;
    this.ticketPrice.next(this.ticketPricesUpdated);
 });
}
}
