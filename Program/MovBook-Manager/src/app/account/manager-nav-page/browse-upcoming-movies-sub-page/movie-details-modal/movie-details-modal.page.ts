import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieCatalogTypesPopoverPage } from '../movie-catalog-types-popover/movie-catalog-types-popover.page';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.page.html',
  styleUrls: ['./movie-details-modal.page.scss'],
})
export class MovieDetailsModalPage implements OnInit {

  // Declaration | Initialization - string variable to store passedMovieId
  passedMovieImdbId = null;

  // Declaration | Initialization - string variable to store passedModalOpenPath
  passedModalOpenPath = null;

  // Declaration | Initialization - boolean variable to store visibility of 'setButtonGridToVisibleCustomer' block
  setButtonGridToVisibleCustomer = false;

  // Declaration | Initialization - boolean variable to store visibility of 'setButtonGridToVisibleManager' block
  setButtonGridToVisibleManager = false;

  // Declaration - stores returned movie details using user defined 'MovieDetails' object data type
  MovieDetails: MovieDetails;

  // Declaration | Initialization - handles the visibility of the 'movieDetailsLoadingSpinner' block
  movieDetailsLoadingSpinner: Boolean = true;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController ,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private managerService: ManagerService
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'movieImdbId'
    this.passedMovieImdbId = this.navParams.get('passingMovieImdbId');

    // Assigning variable with passed 'modalOpenPath'
    this.passedModalOpenPath = this.navParams.get('passingModalOpenPath');

    // Checking whether the modal open path is the customer (and public) path to show buttons grid
    if(this.passedModalOpenPath == 'Public|Customer-Movie-Details'){
      this.setButtonGridToVisibleCustomer = true;
    }

    // Checking whether the modal open path is the manager path to show buttons grid
    if(this.passedModalOpenPath == 'Manager-Movie-Details'){
      this.setButtonGridToVisibleManager = true;
    }

    // Retrieving movie details upon modal load for the selected movie
    this.retrieveMovieDetails();
  }

  // Implementation to close 'Movie Details' modal
  async closeMovieDetailsModal(){
    await this.modalController.dismiss();
  }

  // Implementation for opening the 'Movie Catalog Types' popover
  async openMovieCatalogTypesPopover(evt: Event){
    const movieCatalogTypesPopover = await this.popoverController.create({
      component: MovieCatalogTypesPopoverPage,
      componentProps: {
        passingMovieImdbId: this.passedMovieImdbId,
        passingMovieDetails: this.MovieDetails,
        passingMovieCondition: "New-Movie",
        passingModalOpenPath: "Movie-Details-Modal-Page"
      },
      event: evt
    });
    movieCatalogTypesPopover.present();
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

  // Function - retrieving details movie details
  retrieveMovieDetails(){

    // Send request to server-side and get search movie results as a response
    this.managerService.getMovieDetailsForOneMovie(this.passedMovieImdbId)
      .subscribe((movieDetails: MovieDetails) => {

        // assigning 'movieDetailsLoadingSpinner' to false (stops loading)
        this.movieDetailsLoadingSpinner = false;

        // assigning retrieved movie details into 'MovieDetails' variable
        this.MovieDetails = movieDetails;

      },
      (error: ErrorEvent) => {

        // assigning 'movieDetailsLoadingSpinner' to false (stops loading)
        this.movieDetailsLoadingSpinner = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve details, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve results: ", error);

      });
  
  }

}
