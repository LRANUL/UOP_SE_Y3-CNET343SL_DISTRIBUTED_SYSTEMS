import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  CinemaHall, 
  CinemaLocation, 
  MovieSearchResult 
} from 'src/app/models/account/manager';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Search Upcoming Movies
   */
  // Retrieve movie search results from the backend according to the entered movie title and (optional) movie release year
  getMovieSearchResults(movieTitle: string, movieReleaseYear: string): Observable<MovieSearchResult> {
    if(movieReleaseYear == ""){
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/" + movieTitle);
    }
    else if(movieReleaseYear != ""){
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/" + movieTitle + "/" + movieReleaseYear);
    }
  }

  /**
   * Cinema Hall
   */
  // POST - Passing new cinema hall details to the server-side
  addNewCinemaHall(cinemaHall: CinemaHall){
    return this.httpClient.post(this.BASE_URL + "api/cinema-halls/", cinemaHall);
  }

  // GET - Retrieving cinema hall details from the server-side
  retrieveCinemaHalls(cinemaLocationObjectId){
    return this.httpClient.get(this.BASE_URL + "api/cinema-halls/" + cinemaLocationObjectId);
  }

  /**
   * Cinema Location
   */
  // POST - Passing new cinema location details to the server-side
  addNewCinemaLocation(cinemaLocation: CinemaLocation){
    return this.httpClient.post(this.BASE_URL + "api/cinema-locations", cinemaLocation);
  }

  // GET - Retrieving cinema locations from the server-side
  retrieveCinemaLocations(){
    return this.httpClient.get(this.BASE_URL + "api/cinema-locations");
  }

}
