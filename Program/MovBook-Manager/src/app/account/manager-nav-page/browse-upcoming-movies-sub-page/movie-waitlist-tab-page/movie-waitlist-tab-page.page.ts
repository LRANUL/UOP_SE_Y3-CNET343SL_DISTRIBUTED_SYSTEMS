import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

import { MovieCatalogTypesPopoverPage } from '../movie-catalog-types-popover/movie-catalog-types-popover.page';
import { MovieDetailsModalPage } from '../movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-movie-waitlist-tab-page',
  templateUrl: './movie-waitlist-tab-page.page.html',
  styleUrls: ['./movie-waitlist-tab-page.page.scss'],
})
export class MovieWaitlistTabPagePage implements OnInit {

  // Declaration | Initialization - to handle visibility of 'noOfResultsFoundText' block
  noOfResultsFoundText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'noMovieAvailableText' block
  noMovieAvailableText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerWaitListedMovies' block
  loadingSpinnerWaitListedMovies: Boolean = false;

  // Declaration | Initialization - to handle number of movies retrieved
  retrievedNoOfMovies: Number = 0;

  // Declaration - To store retrieved movies under 'WaitListed'
  movieDetailsAsWaitListed = new Array();

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private managerService: ManagerService
  ) { }

  ngOnInit() {

    // Retrieving movies under 'WaitListed' when the page renders
    this.retrieveMoviesAsWaitListed();
  }

  // Implementation for opening the 'Movie Catalog Types' popover
  async openMovieCatalogTypesPopover(evt: Event, waitListedMovieImdbId: Number, waitListedMovieDetails: any){
    const movieCatalogTypesPopover = await this.popoverController.create({
      component: MovieCatalogTypesPopoverPage,
      componentProps: {
        movieId: waitListedMovieImdbId,
        movieDetails: waitListedMovieDetails
      },
      event: evt
    });
    movieCatalogTypesPopover.present();
  }

  // Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(movieImdbId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Movie-Details-Wait-List',
        passingMovieImdbId: movieImdbId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
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

  // Retrieve all available movies under 'WaitListed'
  retrieveMoviesAsWaitListed(){

    // Assigning 'loadingSpinnerWaitListedMovies' to true (starts loading spinner)
    this.loadingSpinnerWaitListedMovies = true;

    // Assigning 'noMovieAvailableText' to false (removes no movie available text section)
    this.noMovieAvailableText = false;

    // Assigning 'noOfResultsFoundText' to false (removes number of movie available text section)
    this.noOfResultsFoundText = false;

    // Retrieving the wait listed movies
    this.managerService.getMoviesAsMovieStatus("WaitListed")
      .subscribe((retrievedMovieDetailsList: any) => {

      if(retrievedMovieDetailsList.message == "Movies retrieved"){

        // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
        this.loadingSpinnerWaitListedMovies = false;

        // Assigning retrieve movie list to 'movieDetailsAsWaitListed' array
        this.movieDetailsAsWaitListed = retrievedMovieDetailsList.returnedData;

        // Assigning 'retrievedNoOfMovies' the array length of 'movieDetailsAsWaitListed'
        this.retrievedNoOfMovies = this.movieDetailsAsWaitListed.length;
        
        // Assigning 'noOfResultsFoundText' to true (adds number of movie available text section)
        this.noOfResultsFoundText = true;

      }
      else if(retrievedMovieDetailsList.message == "No movies available"){

        // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
        this.loadingSpinnerWaitListedMovies = false;

        // Assigning 'noMovieAvailableText' to true (adds no movie available text section)
        this.noMovieAvailableText = true;

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
      this.loadingSpinnerWaitListedMovies = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve movie details");
    });

  }

}
