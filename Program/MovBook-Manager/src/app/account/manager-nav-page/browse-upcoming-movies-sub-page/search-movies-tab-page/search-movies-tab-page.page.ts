import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { MovieSearchResult } from 'src/app/models/account/manager/movie-search-result';
import { MovieObjectIdResponse, MovieResponse } from 'src/app/models/account/manager/movie';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { AddMovieToMovieWaitList, MovieWaitList, MovieWaitListResponse } from 'src/app/models/account/manager/movie-wait-list';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-search-movies-tab-page',
  templateUrl: './search-movies-tab-page.page.html',
  styleUrls: ['./search-movies-tab-page.page.scss'],
})
export class SearchMoviesTabPagePage implements OnInit {

  // Declaration - formgroup to collect user preferences to search movies on
  searchUpcomingMoviesForm: FormGroup;

  // Declaration - stores returned movie search results using user defined 'MovieSearchResult' object data type
  movieSearchResults: MovieSearchResult;

  // Declaration | Initialization - to handle visibility of 'noOfResultsFoundText' block
  noOfResultsFoundText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'noAvailableMovieText' block
  noAvailableMovieText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'initialSearchMovieText' block
  initialSearchMovieText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerSearchUpcomingMovies' block
  loadingSpinnerSearchUpcomingMovies: Boolean = false;

  // Declaration | Initialization - to store generate movie release years (fives earlier from current year)
  movieReleaseYearsArray = new Array();
  
  constructor(
    private managerService: ManagerService,
    private modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    // Assigning form validation
    this.searchUpcomingMoviesForm = this.formBuilder.group({
      movieTitle: new FormControl('', Validators.required),
      movieReleaseYear: new FormControl('')
    });

    this.generateMovieReleaseYears();

  }

  // Function -  Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Function -  Generating five years using current date for 'movieReleaseYear' ion select
  generateMovieReleaseYears() {

    // Retrieving current date from localhost
    let currentDate = new Date();

    // Extracting current year from current date
    let currentYear = currentDate.getFullYear();

    // For loop - iterating through to generate movieReleaseYearsArray values
    for (let yearDecrementCount = 0; yearDecrementCount < 5; yearDecrementCount++) {
      
      // Pushing current year to array with post decrement in each iteration
      this.movieReleaseYearsArray.push(currentYear--);
      
    }

  }

  // Function - Implementation to reset 'search-movies-tab' to initial state
  resetSearchUpcomingMoviesForm(){

    // Resetting 'searchUpcomingMoviesForm'
    this.searchUpcomingMoviesForm.reset();

    // Resetting 'noOfResultsFoundText'
    this.noOfResultsFoundText = null;

    // Resetting 'movieSearchResults'
    this.movieSearchResults = null;

    // Enabling visibility of initial search movie text 
    this.initialSearchMovieText = true;

  }

  // Function - Retrieving movie search results from the backend by passing the enter movie title and movie release data
  getMovieSearchResults(formValue){

    /**
     * Resetting boolean values to initial state
     */
    // Disabling visibility of initial search movie text 
    this.initialSearchMovieText = false;

    // Disabling visibility of no available movie text 
    this.noAvailableMovieText = false;

    // Disabling visibility of number of results found text
    this.noOfResultsFoundText = false;



    // Enabling visibility of loading spinner
    this.loadingSpinnerSearchUpcomingMovies = true;

    // Send request to server-side and get search movie results as a response
    this.managerService.getMovieSearchResults(formValue.movieTitle, formValue.movieReleaseYear)
      .subscribe((movieSearchResults: MovieSearchResult) => {

        // Disabling visibility of loading spinner
        this.loadingSpinnerSearchUpcomingMovies = false;
        
        // If condition - checking whether the returned response is equal to false
        if(movieSearchResults.Response == "False"){

          // Enabling visibility of no available movie text 
          this.noAvailableMovieText = true;

          // Disabling visibility of number of results found text
          this.noOfResultsFoundText = false;

        }
        else{

          // Disabling visibility of no available movie text 
          this.noAvailableMovieText = false;

          // Enabling visibility of number of results found text
          this.noOfResultsFoundText = true;

        }
        // Initializing retrieved values into user defined 'movieSearchResults' variable 
        this.movieSearchResults = movieSearchResults;
       // console.log(this.movieSearchResults);
      },
      (error: ErrorEvent) => {

        // Disabling visibility of loading spinner
        this.loadingSpinnerSearchUpcomingMovies = false;

        // Disabling visibility of no available movie text 
        this.noAvailableMovieText = false;

        // Disabling visibility of number of results found text
        this.noOfResultsFoundText = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve result(s), apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve results: ", error);
      }
    );
  }

  // Function - Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(movieImdbId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Movie-Details',
        passingMovieImdbId: movieImdbId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
  }


  // Function - Add selected movie into the movie wait list
  addMovieToMovieWaitList(movieImdbId: string){

    /**
     * Adding movie under movie status, 'WaitListed'
     */
    // Checking whether the selected movie is already added
    this.managerService.getMovieDetailsFromDB(movieImdbId)
      .subscribe((movieAvailability: any) => {

        if(movieAvailability.message === "Movie retrieved"){

          let movieExistsMessage = null;

          if(movieAvailability.returnedData.movieStatus === "WaitListed"){
            movieExistsMessage = `"${movieAvailability.returnedData.movieTitle}", is already added to wait list.`;
          }
          else if(movieAvailability.returnedData.movieStatus === "Upcoming"){
            movieExistsMessage = `"${movieAvailability.returnedData.movieTitle}", is already added to movie catalog (Upcoming).`;
          }
          else if(movieAvailability.returnedData.movieStatus === "NowShowing"){
            movieExistsMessage = `"${movieAvailability.returnedData.movieTitle}", is already added to movie catalog (Now Showing).`;
          }

          // Showing message box to the user
          this.alertNotice("Movie Exists", movieExistsMessage);

          console.log("Selected movie was already added.");
        }
        else if(movieAvailability.message === "Movie not available"){

          // Retrieving the movie details from the omdb api
          this.managerService.getMovieDetailsForOneMovie(movieImdbId)
          .subscribe((retrievedMovieDetails: MovieDetails) => {

            if(retrievedMovieDetails.Response === "True"){
              
              // Add movie to the database under 'WaitListed'
              this.managerService.addMovie(retrievedMovieDetails, "WaitListed")
                .subscribe((retrievedMovieResponse: any) => {

                  if(retrievedMovieResponse.message === "Movie Added As WaitListed"){

                    // Showing successful message box to the user
                    this.alertNotice("Movie Added", `"${retrievedMovieResponse.returnedData.movieTitle}" added as 'WaitListed'`);

                  }
                  else{
                    // Showing error message box to the user
                    this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

                    console.log("Unable to add movie");
                  }

                }, (error: ErrorEvent) => {
                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

                  console.log("Unable to add movie ", error);
                }
              );

            }
            else{
              // Showing error message box to the user
              this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

              console.log("Unable to retrieve movie details");
            }

          },
          (error: ErrorEvent) => {
            // Showing error message box to the user
            this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

            console.log("Unable to retrieve results: ", error);
          });

        }
      },
      (error: ErrorEvent) => {
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve results: ", error);
      }
    );

  }

  // Function - Add Movie to Wait List Alert Box Implementation
  async addMovieToWaitListAlert( title: string, content: string, movieImdbId: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Add Movie to Wait List Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            this.addMovieToMovieWaitList(movieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }

}
