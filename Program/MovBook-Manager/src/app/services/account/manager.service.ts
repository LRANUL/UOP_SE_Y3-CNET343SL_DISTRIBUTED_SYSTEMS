import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSearchResult } from 'src/app/models/account/manager/movie-search-result';
import { CinemaLocation } from 'src/app/models/account/manager/cinema-location';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { MovieWaitList, AddMovieToMovieWaitList } from 'src/app/models/account/manager/movie-wait-list';
import { environment } from 'src/environments/environment';
import { CinemaHall } from 'src/app/models/account/manager/cinema-hall';
import { ShowingExperience } from 'src/app/models/account/manager/showing-experience';
import { ShowingMovie } from 'src/app/models/account/manager/showing-movie';
import { ShowingCinemaHallList } from 'src/app/models/account/manager/showing-cinema-hall';

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
    if (movieReleaseYear == "") {
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/search/" + movieTitle);
    }
    else if (movieReleaseYear != "") {
      return this.httpClient
        .get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/search/" + movieTitle + "/" + movieReleaseYear);
    }
  }
  // GET - Retrieving detailed movie details for one movie by passing the imdbId
  getMovieDetailsForOneMovie(movieImdbId: string) {
    return this.httpClient
      .get<MovieDetails>(this.BASE_URL + "api/omdb/upcoming-movies/details/" + movieImdbId);
  }

  /**
   * Movie
   */
  // POST - Adding movie into the database by passing to the server-side
  addMovie(movie: MovieDetails, movieStatus: string) {
    return this.httpClient
      .post(this.BASE_URL + "api/movies/add-movie/" + movieStatus, movie);
  }
  // GET - Retrieving movieObjectId (_id) from the database by passing the movieImdbId
  getMovieObjectId(movieImdbId: string) {
    return this.httpClient
      .get(this.BASE_URL + "api/movies/movie-id/" + movieImdbId);
  }
  // GET - Retrieving movie from the database by passing the movieImdbId
  getMovieDetailsFromDB(movieImdbId: string) {
    return this.httpClient
      .get(this.BASE_URL + "api/movies/movie-details/" + movieImdbId);
  }
  // GET - Retrieving movies by movie status by passing the movieStatus
  getMoviesAsMovieStatus(movieStatus: string) {
    return this.httpClient
      .get(this.BASE_URL + "api/movies/movie-status/" + movieStatus);
  }
  // GET - Retrieving latest five movie from the database
  getLatestFiveMovies(){
    return this.httpClient
      .get(this.BASE_URL + "api/movies/latest-movies/top-five");
  }
  // GET - Retrieving count of movies under a movie status
  getCountOfMoviesByMovieStatus(movieStatus: string){
    return this.httpClient
      .get(this.BASE_URL + "api/movies/movie-status/count/" + movieStatus);
  }
  // PUT - Updating movie status by passing the new movie status and movie imdb ID
  updateMovieStatus(movieImdbId: string, newMovieStatus: string) {
    // Creating an object to pass the movie details
    let movieDetails = {
      movieImdbId: movieImdbId,
      newMovieStatus: newMovieStatus
    }
    return this.httpClient
      .put(this.BASE_URL + "api/movies/update-movie-status", movieDetails);
  }
  // DELETE - Remove movie by passing the movie imdb ID
  removeMovie(movieImdbId: string) {
    return this.httpClient
      .delete(this.BASE_URL + "api/movies/remove-movie/" + movieImdbId);
  }

  /**
   * 
   * Movie Wait List - DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS 
   * 
   */
  // GET - Retrieving movie wait list from the database
  getMovieWaitList(managerObjectId: string) {
    return this.httpClient
      .get(this.BASE_URL + "api/movie-wait-lists/" + managerObjectId);
  }
  // POST - Creating a new movie wait list
  createMovieWaitList(movieWaitList: MovieWaitList) {
    return this.httpClient
      .post(this.BASE_URL + "api/movie-wait-lists/add", movieWaitList);
  }
  // PUT - Updating movie wait list (adding movies to the movie wait list)
  addMovieToMovieWaitList(AddMovieToMovieWaitList: AddMovieToMovieWaitList) {
    return this.httpClient
      .put<AddMovieToMovieWaitList>(this.BASE_URL + "api/movie-wait-lists/add-movie", AddMovieToMovieWaitList);
  }

  /**
   * Cinema Hall
   */
  // POST - Passing new cinema hall details to the server-side
  addNewCinemaHall(cinemaHall: CinemaHall) {
    return this.httpClient.post(this.BASE_URL + "api/cinema-halls/", cinemaHall);
  }
  // GET - Retrieving cinema hall details from the server-side
  retrieveCinemaHalls(cinemaLocationObjectId) {
    return this.httpClient.get(this.BASE_URL + "api/cinema-halls/" + cinemaLocationObjectId);
  }
  // GET - Retrieving one cinema hall by cinemaHallObjectId from the server-side
  retrieveCinemaHallById(cinemaHallObjectId: string) {
    return this.httpClient.get(this.BASE_URL + "api/cinema-halls/hall/" + cinemaHallObjectId);
  }
  // PUT - Updating cinema hall details by sending the updated details to the server-side
  updateCinemaHallDetails(updatedCinemaHallDetails: any) {
    return this.httpClient.put(this.BASE_URL + "api/cinema-halls/update-cinema-hall", updatedCinemaHallDetails);
  }

  /**
   * Cinema Location
   */
  // POST - Passing new cinema location details to the server-side
  addNewCinemaLocation(cinemaLocation: CinemaLocation) {
    return this.httpClient.post(this.BASE_URL + "api/cinema-locations", cinemaLocation);
  }
  // GET - Retrieving cinema locations from the server-side
  retrieveCinemaLocations() {
    return this.httpClient.get(this.BASE_URL + "api/cinema-locations");
  }
  // UPDATE - Updating cinema location details
  updateCinemaLocation(cinemaLocationObjectId: String, updatedCinemaLocationDetails: any) {
    let cinemaLocationObject = {
      _id: cinemaLocationObjectId,
      locationName: updatedCinemaLocationDetails.locationName,
      locationAddressStreetAddress: updatedCinemaLocationDetails.locationAddressStreetAddress,
      locationAddressCity: updatedCinemaLocationDetails.locationAddressCity,
      locationAddressPostalCode: updatedCinemaLocationDetails.locationAddressPostalCode
    }
    return this.httpClient.put(this.BASE_URL + "api/cinema-locations/update", cinemaLocationObject);
  }

  /** Beverages Management */
  // POST - Add new beverage
  addBeverage(newBeverageDetails: any) {
    return this.httpClient.post(this.BASE_URL + "api/refreshments/add-new", newBeverageDetails);
  }
  // GET beverages list
  getBeverages() {
    return this.httpClient.get(this.BASE_URL + "api/refreshments");
  }
  // Update beverages quantity
  updateStock(name, quantity) {
    const body = { name: name, quantity: quantity };
    return this.httpClient.put<any>(this.BASE_URL + "api/refreshments/update-stock", body);
  }
  // Update beverages price
  updatePrice(name, price) {
    const body = { name: name, price: price };
    return this.httpClient.put<any>(this.BASE_URL + "api/refreshments/update-price", body);
  }
  // DELETE - Remove one beverage
  removeBeverage(refreshmentObjectId: String) {
    return this.httpClient.delete(this.BASE_URL + "api/refreshments/remove/" + refreshmentObjectId);
  }

  /** Operator Manager */

  // Gets Operator Profile
  getOperator(email) {
    return this.httpClient.get(this.BASE_URL + "api/operators/" + email);
  }
  // Get operator by Details - Deprecated
  getOperatorByDetails(searchOperatorAccountForm) {
    const firstName = searchOperatorAccountForm.firstName
    const prefix = searchOperatorAccountForm.namePrefix
    const lastName = searchOperatorAccountForm.lastName
    console.log(searchOperatorAccountForm)
    return this.httpClient.get(this.BASE_URL + "api/operators/?firstName=" + firstName + '&' + 'lastName=' + lastName + '&' + 'prefix=' + prefix);
  }

  // Set Operator Account Status
  setOperatorAccountStatus(email, status) {
    const body = { email: email, status: status };
    return this.httpClient.put(this.BASE_URL + "api/operators/status", body);
  }
  // create Operator account
  createOperatorAccount(registrationform) {
    const body = {
      name: {
        prefix: registrationform.namePrefix,
        firstName: registrationform.firstName,
        middleName: registrationform.middleName,
        lastName: registrationform.lastName
      },
      address: {
        streetAddress: registrationform.streetAddress,
        city: registrationform.addressCity,
        postalZipCode: registrationform.addressPostalCode
      },
      emailAddress: registrationform.emailAddress,
      phoneNumber: registrationform.phoneNumber,
      accountStatus: 'Enabled',
      registeredDateTime: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString(),
    };
    return this.httpClient.post(this.BASE_URL + "api/operators/add", body);
  }
  /**
   * Profile Settings
   */
  // Get profile data
  getProfile(email) {
    return this.httpClient.get<any>(this.BASE_URL + "api/managers/" + email);
  }

  /**
   * Showing Experience
   */
  // POST - Passing new showing experience details to the server-side
  addNewShowingExperience(showingExperience: ShowingExperience) {
    return this.httpClient.post(this.BASE_URL + "api/showing-experiences", showingExperience);
  }
  // GET - Retrieving list showing experiences from the server-side
  retrieveListOfShowingExperiences() {
    return this.httpClient.get(this.BASE_URL + "api/showing-experiences/");
  }
  // PUT - Updating showing experience by passing details to the server-side
  editShowingExperience(showingExperience: any) {
    return this.httpClient.put(this.BASE_URL + "api/showing-experiences/update", showingExperience);
  }
  // DELETE - Remove showing experience by passing the showing experience ID
  removeShowingExperience(showingExperienceId: string) {
    return this.httpClient.delete(this.BASE_URL + "api/showing-experiences/delete/" + showingExperienceId);
  }

  /**
   * Showing Movie
   */
  // POST - Passing new showing movie details to the server-side
  addNewShowingMovie(showingMovieDetails: ShowingMovie) {
    return this.httpClient.post(this.BASE_URL + "api/showing-movies/add-new-showing-movie", showingMovieDetails);
  }
  // POST - Checking availability of showing movie
  checkShowingMovieAvailability(showingMovieDetails: any) {
    return this.httpClient.post(this.BASE_URL + "api/showing-movies/check-showing-movie-availability", showingMovieDetails);
  }
  // GET - Retrieve showing movie by movieObjectId
  retrieveShowingMovieByMovieObjectId(movieObjectId: string) {
    return this.httpClient.get(this.BASE_URL + "api/showing-movies/by-movie-object-id/" + movieObjectId);
  }

  /**
   * Showing Cinema Hall
   */
  // POST - Passing showing cinema hall details to the server-side
  assignShowingCinemaHalls(showingCinemaHallList: any) {
    return this.httpClient.post(this.BASE_URL + "api/showing-cinema-halls/assign-showing-cinema-hall", showingCinemaHallList);
  }
  /** DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS */
  // PUT - Update showing cinema hall details by passing update details to the server-side
  updateShowingCinemaHallDetails(updatedCinemaHallDetails: any) {
    return this.httpClient.put(this.BASE_URL + "api/showing-cinema-halls/update-showing-cinema-hall", updatedCinemaHallDetails);
  }

}
