import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EmailValidator } from "@angular/forms";
import { environment } from "src/environments/environment";
import { bookedTickets, movie } from 'src/app/models/operators';
import { MovieBookingSubPagePage } from "../operator-nav-page/movie-booking-sub-page/movie-booking-sub-page.page";

@Injectable({
  providedIn: "root",
})
export class OperatorService {
  allticketInformation: BehaviorSubject<any> = new BehaviorSubject(null);
  ticketInformation = this.allticketInformation.asObservable();
  private BASE_URL = environment.MOVBOOK_BACKEND_URL;
  private BASE_URL_ADMIN = environment.MOVBOOK_BACKEND_ADMIN_SERVER_URL;

  constructor(public http: HttpClient) { }

  getMovies() {
    return this.http.get(this.BASE_URL + "api/movies");
  }
  getOfferStatus() {
    return this.http.get(this.BASE_URL_ADMIN + "api/offer-status");
  }
  setOfferStatus(value) {
    return this.http.get(this.BASE_URL_ADMIN + "api/offer?value=" + value);
  }
  getMaintenanceStatus() {
    return this.http.get(this.BASE_URL_ADMIN + "api/maintenance-status");
  }
  setMaintenanceStatus(value) {
    return this.http.get(this.BASE_URL_ADMIN + "api/maintenance?value=" + value);
  }
  getBeverages() {
    return this.http.get(this.BASE_URL + "api/refreshments");
  }
  async getMessages() {
    return await this.http.get(this.BASE_URL + "api/messages/new");
  }
  sendMessage(messageID, messageBody) {
    const body = { _id: messageID, response: messageBody, status: 'reply' };
    return this.http.put<any>(this.BASE_URL + "api/messages/reply", body);
  }
  getProfile(email) {
    return this.http.get(this.BASE_URL + "api/operators/" + email);
  }
  getMovie(movieTitle) {
    return this.http.get(this.BASE_URL + "api/movie?title=" + movieTitle);
  }
  updateEmail(oldEmail, newEmail) {
    const body = { oldEmail: oldEmail, newEmail: newEmail };
    return this.http.put<any>(this.BASE_URL + "api/operators/update", body);

  }
  updateStock(name, quantity) {
    const body = { name: name, quantity: quantity };
    return this.http.put<any>(this.BASE_URL + "api/refreshments/update-stock", body);
  }
  storeBooking(refreshments, movie, total) {
    var email = localStorage.getItem('email');
    email = 'john@movbook.com'
    const body = { email: email, movieTickets: movie, foodAndBeverages: refreshments, totalCostLKR: total, purchaseDate: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString() };
    console.log(body)
    return this.http.post<any>(this.BASE_URL + "api/booking/add", body);
  }


  /* BOOKING P1 FUNCTIONS*/
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

  getTicket() {
    return this.ticketPrice.asObservable();
  }

  public ExperienceUpdated = {
    showingExperience: '',
    description: ''
  };
  private experience = new Subject();

  getExperience() {
    return this.experience.asObservable();
  }

  private listeners = new Subject<any>();
  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy) {
    this.listeners.next(filterBy);
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

  getmovielocation(location: string) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/cinema-locations/find/location/" + location).subscribe(res => {
      this.locationupdated = res.returnedData;
      this.location.next(this.locationupdated);
    });
  }
  getShowingMovies() {
    return this.http.get<{ returnedData: any }>(this.BASE_URL + "api/movies").subscribe(res => {
      this.movieupdated = res.returnedData;
      this.movie.next(this.movieupdated);
    });
  }

  getSpecificShowingMovie(showingId: string) {
    return this.http.get<{ message: string, tickets: any }>(this.BASE_URL + "api/booking-details/id/" + showingId).subscribe(res => {
      console.log(res.tickets);
      this.movieShowingUpdated = res.tickets;
      this.Showingmovie.next(this.movieShowingUpdated);
    });
  }

  getMovieDetail(movieId) {
    return this.http.get<{ message: string, returnedData: any }>(this.BASE_URL + "api/movies/" + movieId).subscribe(res => {
      this.movieupdated = res.returnedData;
      this.movie.next(this.movieupdated);
    });
  }
}