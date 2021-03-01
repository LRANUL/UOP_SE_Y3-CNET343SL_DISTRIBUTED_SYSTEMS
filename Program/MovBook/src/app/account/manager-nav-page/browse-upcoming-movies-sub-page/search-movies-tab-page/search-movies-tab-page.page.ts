import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { MovieSearchResult } from 'src/app/models/account/manager';
import { MovieObjectIdResponse, MovieResponse } from 'src/app/models/movie';
import { MovieDetails } from 'src/app/models/movie-details';
import { AddMovieToMovieWaitList, MovieWaitList, MovieWaitListResponse } from 'src/app/models/movie-wait-list';
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

    // Declaration - stores 'movieObjectId' that will be retrieved from the database
    let movieObjectId;

    /**
     * Updating movie wait list with selected movie
     */
    // Retrieving movie wait list for manager user
    this.managerService.getMovieWaitList("0000")
      .subscribe((retrievedMovieWaitList: any) => {


        // If condition - checking whether there is a movie wait list existing
        if(retrievedMovieWaitList.message == "No movie wait list available"){
         

          // Retrieving the movie details from the omdb api
          this.managerService.getMovieDetailsForOneMovie(movieImdbId)
            .subscribe((retrievedMovieDetails: MovieDetails) => {
              

            // Retrieving movieObjectId (_id) for the selected movie 
            this.managerService.getMovieObjectId(movieImdbId)
              .subscribe((retrievedMovieObjectId: MovieObjectIdResponse) => {
      

              // If condition - checking whether there is a similar movie document object already existing in the 'movies' collection
              if(retrievedMovieObjectId.message == "Movie not available"){
         

                // Adding movie into the 'movies' collection and retrieving the movie object Id
                this.managerService.createNewMovie(retrievedMovieDetails)
                  .subscribe((retrievedNewMovieResponse: MovieResponse) => {

                    
                  // If condition - checking whether the selected movie was added to the 'movies' collection
                  if(retrievedNewMovieResponse.message == "Created new movie"){
                 
                    
                    // Extracting movieObjectId (_id) from the newly created movie document object
                    movieObjectId = retrievedNewMovieResponse.returnedData._id;

                    
                    // Declaration | Initialization - holds a instance of 'MovieWaitList' to pass to the server-side application
                    let movieWaitListObject: MovieWaitList = {
                      managerObjectId: "0000",
                      movieObjectId: [movieObjectId]
                    }


                    // Creating a new movie wait list document object in the 'moviewaitlist' collection 
                    this.managerService.createMovieWaitList(movieWaitListObject)
                      .subscribe((retrievedMovieWaitListResponse: any) => {

                        // If condition - checking whether the confirmation of creating movie wait list was returned
                        if(retrievedMovieWaitListResponse.message == "Created new movie wait list, added movie"){

                          // Showing confirmation of creating movie wait list to the user
                          this.alertNotice("Movie Added", "Movie wait list created and movie added successfully");

                        }

                      },
                      (error: ErrorEvent) => {
                          
                        // Showing error message box to the user
                        this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

                        console.log("Error - Unable to add movie to movie wait list: ", error);

                      })

                  }
                    
                },
                (error: ErrorEvent) => {
                  
                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

                  console.log("Error - Unable to add movie to movie wait list: ", error);

                });

              }
              else if(retrievedMovieObjectId.message == "Movie object ID (_id) retrieved"){
                // If the movie already exists in the 'movies' collection, the movieObjectId was retrieved


                // Extracting retrieved movieObjectId (_id) and assigning it to 'movieObjectId'
                movieObjectId = retrievedMovieObjectId.returnedData[0]._id;


                // Declaration | Initialization - holds a instance of 'MovieWaitList' to pass to the server-side application
                let movieWaitListObject: MovieWaitList = {
                  managerObjectId: "0000",
                  movieObjectId: [movieObjectId]
                }


                // Creating a new movie wait list document object in the 'moviewaitlist' collection
                this.managerService.createMovieWaitList(movieWaitListObject)
                  .subscribe((retrievedMovieWaitListResponse: any) => {

                  // If condition - checking whether the confirmation of creating movie wait list was returned
                  if(retrievedMovieWaitListResponse.message == "Created new movie wait list, added movie"){

                    // Showing confirmation of creating movie wait list to the user
                    this.alertNotice("Movie Added", "Movie wait list created and movie added successfully");

                  }

                },
                (error: ErrorEvent) => {
                          
                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

                  console.log("Error - Unable to add movie to movie wait list: ", error);

                })

              }

            },
            (error: ErrorEvent) => {

              // Showing error message box to the user
              this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

              console.log("Error - Unable to add movie to movie wait list: ", error);

            })

          },
          (error: ErrorEvent) => {

            // Showing error message box to the user
            this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

            console.log("Error: ", error);

          });


        }
        else if(retrievedMovieWaitList.message == "Movie wait list retrieved"){
          // If a movie wait list already exists, then it was retrieved


          // Retrieving the movieObjectId from the 'movies' collection
          this.managerService.getMovieObjectId(movieImdbId)
            .subscribe((retrievedMovieObjectId: MovieObjectIdResponse) => {


            // If condition - checking whether the selected movie was available in the 'movies' collection
            if(retrievedMovieObjectId.message == "Movie not available"){


              // Retrieving the movie details from the omdb api
              this.managerService.getMovieDetailsForOneMovie(movieImdbId)
              .subscribe((retrievedMovieDetails: MovieDetails) => {


                // Add retrieve movie details into the 'movies' collection
                this.managerService.createNewMovie(retrievedMovieDetails)
                  .subscribe((retrievedNewMovieResponse: MovieResponse) => {

                    
                  // If condition - checking whether the confirmation of adding the movie to the 'movies' collection was returned
                  if(retrievedNewMovieResponse.message == "Created new movie"){


                    // Extracting the movieObjectId (_id) and assigning to the 'movieObjectId'
                    movieObjectId = retrievedNewMovieResponse.returnedData._id;


                    // For loop - iterating through the existing movieObjectId in the movie wait list
                    for (let movieObjectIdCount = 1; movieObjectIdCount <= retrievedMovieWaitList.returnedData[0].movieObjectId.length; movieObjectIdCount++) {
                
                      // If condition - checking whether the selected movie already exists in the movie wait list
                      if(retrievedMovieWaitList.returnedData[0].movieObjectId[movieObjectIdCount] == movieObjectId){
                        this.alertNotice("Movie Exists", "Movie is already available in movie wait list");
                      }
                      
                    }

                    
                    // Declaration | Initialization - holds a instance of 'MovieWaitList' to pass to the server-side application
                    let newMovieWaitListUpdate: AddMovieToMovieWaitList = {
                      managerObjectId: "0000",
                      movieObjectId: movieObjectId
                    };
        

                    // Passing selected movieObjectId along with managerObjectId to update the movie wait list
                    this.managerService.addMovieToMovieWaitList(newMovieWaitListUpdate)
                      .subscribe((addMovieResponse: any) => {
                     

                      // If condition - checking whether the confirmation of adding the movie to the movie list was returned
                      if(addMovieResponse.message == "Movie wait list updated"){

                        // Showing alert box of the confirmation of adding the movie into the movie wait list
                        this.alertNotice("Movie Added", "Selected movie was successfully added to the movie wait list");
                      
                      }
                      
                    },
                    (error: ErrorEvent) => {

                      // Showing error message box to the user
                      this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

                      console.log("Error: ", error);

                    })

                  }

                })
                
              })
            }
            else if(retrievedMovieObjectId.message == "Movie object ID (_id) retrieved"){
            // If selected movie is already available in the 'movies' collection


              // Extracting the movieObjectId (_id) and assigning to the 'movieObjectId'
              movieObjectId = retrievedMovieObjectId.returnedData[0]._id;


              // For loop - iterating through the existing movieObjectId in the movie wait list
              for (let movieObjectIdCount = 1; movieObjectIdCount <= retrievedMovieWaitList.returnedData[0].movieObjectId.length; movieObjectIdCount++) {
          
                // If condition - checking whether the selected movie already exists in the movie wait list
                if(retrievedMovieWaitList.returnedData[0].movieObjectId[movieObjectIdCount] == movieObjectId){
                  this.alertNotice("Movie Exists", "Movie is already available in movie wait list");
                }
                
              }

              
              // Declaration | Initialization - holds a instance of 'MovieWaitList' to pass to the server-side application
              let newMovieWaitListUpdate: AddMovieToMovieWaitList = {
                managerObjectId: "0000",
                movieObjectId: movieObjectId
              };
  

              // Passing selected movieObjectId along with managerObjectId to update the movie wait list
              this.managerService.addMovieToMovieWaitList(newMovieWaitListUpdate)
                .subscribe((addMovieResponse: any) => {
               

                // If condition - checking whether the confirmation of adding the movie to the movie list was returned
                if(addMovieResponse.message == "Movie wait list updated"){

                  // Showing alert box of the confirmation of adding the movie into the movie wait list
                  this.alertNotice("Movie Added", "Selected movie was successfully added to the movie wait list");
                
                }
                
              },
              (error: ErrorEvent) => {

                // Showing error message box to the user
                this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

                console.log("Error: ", error);

              })

            }

          })

        }

      },
      (error: ErrorEvent) => {

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to add movie to movie wait list, apologies for the inconvenience. Please contact administrator.");

        console.log("Error: ", error);

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
