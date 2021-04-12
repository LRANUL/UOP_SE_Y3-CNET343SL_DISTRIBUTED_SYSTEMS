import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { bookedTickets, movie } from 'src/app/models/account/customers';
import { Movie } from 'src/app/models/account/movie';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;
  constructor(private http: HttpClient) { }

  public updatedBookedtickets: bookedTickets
  private currentBookedtickets = new Subject();

  gettickets() {
    return this.currentBookedtickets.asObservable();
  }

  public moviesUpdated = {
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemaLocation: {
      cinemaLocationObjectId: '',
      cinemaLocationName: '',
      cinemaLocationAddress: {
        streetAddress: '',
        city: '',
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

  getmovie() {
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

  getlocation() {
    return this.location.asObservable();
  }

  public hallupdated = {
    cinemaLocationObjectId: '',
    cinemaHallName: '',
    seatingGridNoOfRows: '',
    seatingGridNoOfColumns: '',
    seatingDetails: [{
      seatId: '',
      seatAllocatedPositionNo: '',
      seatActive: '',
      seatNumber: '',
      seatUnavailable: ''
    }]
  };
  private hall = new Subject();

  gethall() {
    return this.hall.asObservable();
  }

  public showinghallupdated = {
    showingCinemaHallObjectId: '',
    slotObjectId: '',
    showingMovieObjectId: '',
    cinemaHallObjectID: '',
    cinemaLocationObjectId: '',
    showingSeatDetails: [
      {
        _id: '',
        seatId: '',
        seatNumber: '',
        seatUnavailable: '',
        seatStatus: '',
        seatType: '',
        customerObjectId: '',
      }
    ]
  };
  private showingcinemahall = new Subject();

  getShowingCinemaHall() {
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

  getmovies() {
    return this.movie.asObservable();
  }

  getShowingMovie() {
    return this.Showingmovie.asObservable();
  }

  public ticketPricesUpdated = {
    movieObjectId: '',
    showingTimeSlot: '',
    ticketCost: {
      adult: '',
      children: '',
    }
  };
  private ticketPrice = new Subject();

  public movieShowingUpdated = {
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemaLocation: {
      cinemaLocationObjectId: '',
      cinemaLocationName: '',
      cinemaLocationAddress: {
        streetAddress: '',
        city: '',
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

  public ExperienceUpdated = {
    showingExperience: '',
    description: ''
  };
  private experience = new Subject();

  getExperience() {
    return this.experience.asObservable();
  }


  getUser(id: string) {
    return this.http.get<{ message: string, users: any }>(this.BASE_URL + "/api/customers/" + id)
  }

  private listeners = new Subject<any>();
  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy) {
    this.listeners.next(filterBy);
  }

  updateuser(value, id) {
    console.log(value);
    this.http.put<{ message: string }>(this.BASE_URL + "api/customers/" + id, value).subscribe((responsestatus) => {
      console.log(responsestatus);
    });
  }

  getloyality(email: string) {
    return this.http.get<{ message: string, users }>(this.BASE_URL + "api/loyalty/" + email)
  }

  getbookinghistory(id: string) {
    return this.http.get<{ message: string, tickets: any }>(this.BASE_URL + "api/booking-history/" + id).subscribe(res => {
      this.updatedBookedtickets = res.tickets;
      this.currentBookedtickets.next(this.updatedBookedtickets);
    })
  }

  getshowingmoviedetails(id: string) {
    return this.http.get<{ tickets: movie }>(this.BASE_URL + "api/booking-details/" + id).subscribe(res => {
      console.log(res.tickets)
      this.moviesUpdated = res.tickets;
      this.currentmovies.next(this.moviesUpdated);
    })
  }

  getSelectedShowingMovieDetails(location: string) {
    return this.http.get<{ tickets: movie }>(this.BASE_URL + 'api/booking-details/location/' + location).subscribe(res => {
      this.moviesUpdated = res.tickets;
      this.currentmovies.next(this.moviesUpdated);
    })
  }

  retrieveCinemaHall(id) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + 'api/cinema-halls/hall/' + id).subscribe(res => {
      this.hallupdated = res.returnedData;
      this.hall.next([this.hallupdated]);
    });
  }

  retrieveShowingCinemaHall(id) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + 'api/showing-cinema-hall/' + id).subscribe(res => {
      console.log(res.returnedData);
      this.showinghallupdated = res.returnedData;
      this.showingcinemahall.next(this.showinghallupdated);
    });
  }

  retrieveCinemaLocation(cinemaLocationObjectId) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/cinema-locations/location/" + cinemaLocationObjectId).subscribe(res => {
      this.locationupdated = res.returnedData;
      this.location.next([this.locationupdated]);
    });
  }

  retrieveAllCinemaLocations() {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/cinema-locations").subscribe(res => {
      this.locationupdated = res.returnedData;
      this.location.next(this.locationupdated);
    });
  }

  retrieveAllExperience() {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/showing-experiences").subscribe(res => {
      console.log(res.returnedData)
      this.ExperienceUpdated = res.returnedData;
      this.experience.next(this.ExperienceUpdated);
    });
  }

  getmoviedetails(id: string) {
    // have to write the code to get the movie here
  }

  getmovieexperience(experience: string) {
    return this.http.get<{ message: string, tickets: any }>(this.BASE_URL + "api/booking-details/experience/" + experience).subscribe(res => {
      console.log(res.tickets);
      this.moviesUpdated = res.tickets;
      this.currentmovies.next(this.moviesUpdated);
    })
  }

  getSpecificShowingMovie(showingId: string) {
    return this.http.get<{ message: string, tickets: movie }>(this.BASE_URL + "api/booking-details/id/" + showingId).subscribe(res => {
      console.log(res.tickets);
      this.movieShowingUpdated = res.tickets;
      this.Showingmovie.next(this.movieShowingUpdated);
    });
  }

  getShowingMovies() {
    return this.http.get<{ returnedData: any }>(this.BASE_URL + "api/movies").subscribe(res => {
      this.movieupdated = res.returnedData;
      this.movie.next(this.movieupdated);
    });
  }

  getMovieDetail(movieId) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/movies/" + movieId).subscribe(res => {
      this.movieupdated = res.returnedData;
      this.movie.next(this.movieupdated);
    });
  }
}
