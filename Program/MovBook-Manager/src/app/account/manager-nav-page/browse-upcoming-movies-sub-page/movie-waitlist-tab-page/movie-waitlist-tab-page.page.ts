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
  async openMovieCatalogTypesPopover(evt: Event){
    const movieCatalogTypesPopover = await this.popoverController.create({
      component: MovieCatalogTypesPopoverPage,
      componentProps: {
        movieId: '<SAMPLE VALUE>'
      },
      event: evt
    });
    movieCatalogTypesPopover.present();
  }

  // Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        modalOpenPath: 'Manager-Movie-Details',
        movieId: '<SAMPLE VALUE>'
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

    this.loadingSpinnerWaitListedMovies = true;

    this.noMovieAvailableText = false;

    this.noOfResultsFoundText = false;

    // Retrieving the movies
    this.managerService.getMoviesAsMovieStatus("WaitListed")
      .subscribe((retrievedMovieDetailsList: any) => {

      if(retrievedMovieDetailsList.message == "Movies retrieved"){

        this.loadingSpinnerWaitListedMovies = false;

        this.movieDetailsAsWaitListed = retrievedMovieDetailsList.returnedData;

        this.retrievedNoOfMovies = this.movieDetailsAsWaitListed.length;
        
        this.noOfResultsFoundText = true;

      }
      else if(retrievedMovieDetailsList.message == "No movies available"){

        this.loadingSpinnerWaitListedMovies = false;

        this.noMovieAvailableText = true;

      }

    }, (error: ErrorEvent) => {
      this.loadingSpinnerWaitListedMovies = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve movie details");
    });

  }

}
