import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../../browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-upcoming-movies-tab-page',
  templateUrl: './upcoming-movies-tab-page.page.html',
  styleUrls: ['./upcoming-movies-tab-page.page.scss'],
})
export class UpcomingMoviesTabPagePage implements OnInit {

  // Declaration | Initialization - to handle visibility of 'noOfResultsFoundText' block
  noOfResultsFoundText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'noMovieAvailableText' block
  noMovieAvailableText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerUpcomingMovies' block
  loadingSpinnerUpcomingMovies: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerRemoveMovie' block
  loadingSpinnerRemoveMovie: Boolean = false;

  // Declaration | Initialization - to handle number of movies retrieved
  retrievedNoOfMovies: Number = 0;

  // Declaration - To store retrieved movies under 'movieDetailsAsUpcoming'
  movieDetailsAsUpcoming = new Array();

  constructor(
    private managerService: ManagerService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Retrieving movies under 'WaitListed' when the page is initially rendered
    this.retrieveMoviesAsUpcoming();
  }

  ionViewWillEnter(){
    // Retrieving movies under 'Upcoming' when the page is viewed
    this.retrieveMoviesAsUpcoming();
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

  // Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(movieImdbId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Movie-Details-Upcoming',
        passingMovieImdbId: movieImdbId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
  }
  
  // Retrieve all available movies under 'Upcoming'
  retrieveMoviesAsUpcoming(){

    // Assigning 'loadingSpinnerUpcomingMovies' to true (starts loading spinner)
    this.loadingSpinnerUpcomingMovies = true;

    // Assigning 'noMovieAvailableText' to false (removes no movie available text section)
    this.noMovieAvailableText = false;

    // Retrieving the wait listed movies
    this.managerService.getMoviesAsMovieStatus("Upcoming")
      .subscribe((retrievedMovieDetailsList: any) => {

      if(retrievedMovieDetailsList.message == "Movies retrieved"){

        // Assigning 'loadingSpinnerUpcomingMovies' to false (stops loading spinner)
        this.loadingSpinnerUpcomingMovies = false;

        // Assigning retrieve movie list to 'movieDetailsAsUpcoming' array
        this.movieDetailsAsUpcoming = retrievedMovieDetailsList.returnedData;

        // Assigning 'retrievedNoOfMovies' the array length of 'movieDetailsAsUpcoming'
        this.retrievedNoOfMovies = this.movieDetailsAsUpcoming.length;
        
        // Assigning 'noOfResultsFoundText' to true (adds number of movie available text section)
        this.noOfResultsFoundText = true;

      }
      else if(retrievedMovieDetailsList.message == "No movies available"){

        // Assigning 'loadingSpinnerUpcomingMovies' to false (stops loading spinner)
        this.loadingSpinnerUpcomingMovies = false;

        // Assigning 'noMovieAvailableText' to true (adds no movie available text section)
        this.noMovieAvailableText = true;

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerUpcomingMovies' to false (stops loading spinner)
      this.loadingSpinnerUpcomingMovies = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve movie details");
    });

  }

  // Function - Remove Upcoming Movie Alert Box Implementation
  async removeUpcomingMovieAlert( title: string, content: string, movieImdbId: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Remove Movie from Upcoming Movies Movie Catalog Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            this.removeUpcomingMovie(movieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Remove Upcoming Movie
  removeUpcomingMovie(movieImdbId: string){

    // Assigning 'loadingSpinnerRemoveMovie' to true (starts loading spinner)
    this.loadingSpinnerRemoveMovie = true;

    // Removing movie from Upcoming Movies Movie Catalog from the database
    this.managerService.removeMovie(movieImdbId)
      .subscribe((movieRemovedResponse: any) => {
        
      if(movieRemovedResponse.message == "Movie removed"){

        this.loadingSpinnerRemoveMovie = false;

        // Showing success message box to the user
        this.alertNotice("Movie Removed", "Movie was removed from the Upcoming Movies Movie Catalog");

        console.log("Movie was removed from the Upcoming Movies Movie Catalog");

        // Re-rendering function to retrieve all movies in upcoming 
        this.retrieveMoviesAsUpcoming();

      }
      else if(movieRemovedResponse.message == "Unable to remove movie"){
        // Assigning 'loadingSpinnerRemoveMovie' to false (stops loading spinner)
        this.loadingSpinnerRemoveMovie = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to remove movie, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to remove movie");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerRemoveMovie' to false (stops loading spinner)
      this.loadingSpinnerRemoveMovie = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to remove movie, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to remove movie");
    });

  }
  

}
