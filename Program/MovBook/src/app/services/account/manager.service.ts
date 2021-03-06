import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSearchResult } from 'src/app/models/account/manager/movie-search-result';
import { CinemaLocation } from 'src/app/models/account/manager/cinema-location';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { MovieWaitList, AddMovieToMovieWaitList } from 'src/app/models/account/manager/movie-wait-list';
import { environment } from 'src/environments/environment';
import { CinemaHall } from 'src/app/models/account/manager/cinema-hall';

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
   * Movie
   */
  // POST - Adding movie into the database by passing to the server-side
  createNewMovie(movie: MovieDetails){
    return this.httpClient
      .post(this.BASE_URL + "api/movies/", movie);
  }
  // GET - Retrieving movieObjectId (_id) from the database by passing the movieImdbId
  getMovieObjectId(movieImdbId: string){
    return this.httpClient
      .get(this.BASE_URL + "api/movies/id/" + movieImdbId);
  }
  // GET - Retrieving movie from the database by passing the movieImdbId
  getMovie(movieImdbId: string){
    return this.httpClient
      .get(this.BASE_URL + "api/movies/" + movieImdbId);
  }

  /**
   * Movie Wait List
   */
  // GET - Retrieving movie wait list from the database
  getMovieWaitList(managerObjectId: string){
    return this.httpClient
      .get(this.BASE_URL + "api/movie-wait-lists/" + managerObjectId);
  }
  // POST - Creating a new movie wait list
  createMovieWaitList(movieWaitList: MovieWaitList){
    return this.httpClient
      .post(this.BASE_URL + "api/movie-wait-lists/add", movieWaitList);
  }
  // PUT - Updating movie wait list (adding movies to the movie wait list)
  addMovieToMovieWaitList(AddMovieToMovieWaitList: AddMovieToMovieWaitList){
    return this.httpClient
      .put<AddMovieToMovieWaitList>(this.BASE_URL + "api/movie-wait-lists/add-movie", AddMovieToMovieWaitList);
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
