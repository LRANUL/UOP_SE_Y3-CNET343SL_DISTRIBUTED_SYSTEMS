import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { bookedTickets, movie} from 'src/app/models/account/customers';
import { Movie } from 'src/app/models/account/movie';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;
  private secodary_url = environment.MOVBOOK_BACKEND_ADMIN_SERVER_URL;

  allticketInformation: BehaviorSubject<any> = new BehaviorSubject(null);
  ticketInformation = this.allticketInformation.asObservable();
  constructor(private http: HttpClient) { }

  public updatedBookedtickets : bookedTickets
  private currentBookedtickets = new Subject();

  gettickets(){
    return this.currentBookedtickets.asObservable();
  }

  getBeverages() {
    return this.http.get(this.BASE_URL + "api/refreshments");
  }
  storeBooking(refreshments, movie, refreshmentsTotal, total) {
    var email = localStorage.getItem('email');
    const body = { email: email, movieTickets: movie, foodAndBeverages: refreshments, mealCostLKR: refreshmentsTotal, totalCostLKR: total, purchaseDate: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString() };
    console.log(body)
    return this.http.post<any>(this.BASE_URL + "api/bookings/add", body);
  }

  addPoints(billTotal) {
    var email = localStorage.getItem('email');
    var points = billTotal/10;
    const body = { points: points, email: email }
    return this.http.put(this.BASE_URL + "api/loyalty/add", body)
  }
  public moviesUpdated = {
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemaLocation: {
    cinemaLocationObjectId : '',
    cinemaLocationName : '',
    cinemaLocationAddress : {
      streetAddress : '',
      city : '',
      postalCode: '',
    }
  },
    showingStartDate: '',
    showingEndDate: '',
    showingSlots: [{
    _id: '',
    showingDate: '',
    showingExperience: '',
    timeSlotStartTime: '',
    timeSlotEndTime: '',
    adultsTicketFeeLKR: '',
    childrenTicketFeeLKR: ''
    }]
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

  public showinghallupdated = {
    showingCinemaHallObjectId: '',
    slotObjectId: '',
    showingMovieObjectId: '',
    cinemaHallObjectID: '',
    cinemaLocationObjectId : '',
    showingSeatDetails : [
      {
        _id: '',
        seatId : '',
        seatNumber: '',
        seatUnavailable: '',
        seatStatus : '',
        seatActive : '',
        customerObjectId : '',
      }
    ]
  };
  private showingcinemahall = new Subject();

  getShowingCinemaHall()
  {
    return this.showingcinemahall.asObservable();
  }


  public movieupdated = {
    movieStatus: '',
    movieTitle: '',
    rated: '',
    releasedYear: '',
    releasedDate: '',
    movieRuntime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    posterLink: '',
    ratings: [
      {
        Source: '',
        Value: '',
      }
    ],
    imdb: {
      imdbID: '',
      imdbRating: '',
      imdbVotes: ''
    },
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
      cinemaLocation: {
      cinemaLocationObjectId : '',
      cinemaLocationName : '',
      cinemaLocationAddress : {
        streetAddress : '',
        city : '',
        postalCode: '',
      }
    },
      showingStartDate: '',
      showingEndDate: '',
      showingSlots: [{
      _id: '',
      showingExperience: '',
      showingDate: '',
      timeSlotStartTime: '',
      timeSlotEndTime: '',
      adultsTicketFeeLKR: '',
      childrenTicketFeeLKR: ''
    }]
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

        public ExperienceUpdated = {
          showingExperience: '',
          description: ''
          };
          private experience = new Subject();

          getExperience()
        {
          return this.experience.asObservable();
        }


getUser(email :string)
{
  return this.http.get<{message: string, users: any}>(this.BASE_URL + "api/customers/" + email)
}

private listeners = new Subject<any>();
listen():Observable<any>{
  return this.listeners.asObservable();
}

filter(filterBy)
{
 this.listeners.next(filterBy);
}

updateuser(value, id)
{
  console.log(value);
  this.http.put<{message: string}>(this.BASE_URL +"api/customers/" + id, value).subscribe((responsestatus) => {
    console.log(responsestatus);
    this.http.put(this.secodary_url +"api/logins/customer/" + id, value).subscribe((responsestatus) =>{console.log(responsestatus)})
});
}

getloyality(email:string)
{
  return this.http.get<{message: string, users}>(this.BASE_URL +"api/loyalty/" + email)
}

getbookinghistory(email: string)
{
  return this.http.get<{message : string, tickets : any}>(this.BASE_URL +"api/booking-history/" + email).subscribe(res=>{
  this.updatedBookedtickets = res.tickets;
  this.currentBookedtickets.next(this.updatedBookedtickets);
})
}

getshowingmoviedetails(id: string)
{ //change made
  return this.http.get<{tickets:movie}>(this.BASE_URL +"api/showing-movies/" + id).subscribe(res=>{
    console.log(res.tickets)
    this.moviesUpdated = res.tickets;
    this.currentmovies.next(this.moviesUpdated);
  })
}

retrieveCinemaHall(id){
  return this.http.get<{message: string, returnedData: any}>(this.BASE_URL +'api/cinema-halls/hall/' + id).subscribe(res=>{
    this.hallupdated = res.returnedData;
    this.hall.next([this.hallupdated]);
  });
}

retrieveShowingCinemaHall(id){
  return this.http.get<{message: string, returnedData: any}>(this.BASE_URL +'api/showing-cinema-halls/' + id).subscribe(res=>{
    console.log(res.returnedData);
    this.showinghallupdated = res.returnedData;
    this.showingcinemahall.next(this.showinghallupdated);
  });
}

retrieveCinemaLocation(cinemaLocationObjectId){
  return this.http.get<{message: string, returnedData: any}>(this.BASE_URL +"api/cinema-locations/location/" + cinemaLocationObjectId).subscribe(res=>{
    this.locationupdated = res.returnedData;
    this.location.next([this.locationupdated]);
  });
}

retrieveAllCinemaLocations(){
  return this.http.get<{message: string, returnedData: any}>(this.BASE_URL +"api/cinema-locations").subscribe(res=>{
    this.locationupdated = res.returnedData;
    this.location.next(this.locationupdated);
  });
}

retrieveAllExperience(){
  return this.http.get<{message: string, returnedData: any}>(this.BASE_URL +"api/showing-experiences").subscribe(res=>{
    console.log(res.returnedData)
    this.ExperienceUpdated = res.returnedData;
    this.experience.next(this.ExperienceUpdated);
  });
}

getmovielocation(location: string)
{
  return this.http.get<{message : string, returnedData : any}>(this.BASE_URL + "api/cinema-locations/find/location/" + location).subscribe(res=>{
    this.locationupdated= res.returnedData;
    this.location.next(this.locationupdated);
  });
}

getShowingMovies()
{
  return this.http.get<{returnedData : any}>(this.BASE_URL + "api/movies").subscribe(res=>{
    this.movieupdated= res.returnedData;
    this.movie.next(this.movieupdated);
 });
}

getSpecificShowingMovie(showingId: string)
{//change made
  return this.http.get<{message : string, tickets : movie}>(this.BASE_URL + "api/showing-movies/id/" + showingId).subscribe(res=>{
    console.log(res.tickets);
    this.movieShowingUpdated = res.tickets;
    this.Showingmovie.next(this.movieShowingUpdated);
 });
}

getMovieDetail(movieId)
{
  return this.http.get<{message : string, returnedData : any}>(this.BASE_URL + "api/movies/" + movieId).subscribe(res=>{
    this.movieupdated= res.returnedData;
    this.movie.next(this.movieupdated);
 });
}
}
