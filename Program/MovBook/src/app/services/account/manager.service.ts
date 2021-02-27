import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  CinemaHall, 
  CinemaLocation, 
  MovieDetails, 
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
  // GET - Retrieving movie search results from the backend according to the entered movie title and (optional) movie release year
  getMovieSearchResults(movieTitle: string, movieReleaseYear: string): Observable<MovieSearchResult> {
    if(movieReleaseYear == ""){
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/search/" + movieTitle);
    }
    else if(movieReleaseYear != ""){
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/search/" + movieTitle + "/" + movieReleaseYear);
    }
  }

  // GET - Retrieving detailed movie details for one movie by passing the imdbId
  getMovieDetailsForOneMovie(movieImdbId: string){
    return this.httpClient
        .get<MovieDetails>(this.BASE_URL + "api/omdb/upcoming-movies/details/" + movieImdbId);
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
