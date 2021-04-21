import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../../browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.page';
import { ViewShowingModalPage } from '../view-showing-modal/view-showing-modal.page';

@Component({
  selector: 'app-now-showing-movies-tab-page',
  templateUrl: './now-showing-movies-tab-page.page.html',
  styleUrls: ['./now-showing-movies-tab-page.page.scss'],
})
export class NowShowingMoviesTabPagePage implements OnInit {

  // Declaration | Initialization - to handle visibility of 'noOfResultsFoundText' block
  noOfResultsFoundText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'noMovieAvailableText' block
  noMovieAvailableText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerNowShowingMovies' block
  loadingSpinnerNowShowingMovies: Boolean = false;

  // Declaration | Initialization - to handle number of movies retrieved
  retrievedNoOfMovies: Number = 0;

  // Declaration - To store retrieved movies under 'movieDetailsAsNowShowing'
  movieDetailsAsNowShowing = new Array();

  constructor(
    private managerService: ManagerService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Retrieving movies under 'WaitListed' when the page is initially rendered
    this.retrieveMoviesAsNowShowing();
  }

  ionViewWillEnter(){
    // Retrieving movies under 'Upcoming' when the page is viewed
    this.retrieveMoviesAsNowShowing();
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

  // Implementation for opening the 'Movie Details Modal'
  async openMovieDetailsModal(movieImdbId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Movie-Details-Now-Showing',
        passingMovieImdbId: movieImdbId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
  }
  
  // Implementation for opening the 'View Showing Modal'
  async openViewShowingModal(selectedMovieObjectId: string){
    const viewShowingModal = await this.modalController.create({
      component: ViewShowingModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingMovieObjectId: selectedMovieObjectId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    viewShowingModal.present();
  }

  // Retrieve all available movies under 'NowShowing'
  retrieveMoviesAsNowShowing(){

    // Assigning 'loadingSpinnerNowShowingMovies' to true (starts loading spinner)
    this.loadingSpinnerNowShowingMovies = true;

    // Assigning 'noMovieAvailableText' to false (removes no movie available text section)
    this.noMovieAvailableText = false;

    // Retrieving the now showing movies
    this.managerService.getMoviesAsMovieStatus("NowShowing")
      .subscribe((retrievedMovieDetailsList: any) => {

      if(retrievedMovieDetailsList.message == "Movies retrieved"){

        // Assigning 'loadingSpinnerNowShowingMovies' to false (stops loading spinner)
        this.loadingSpinnerNowShowingMovies = false;

        // Assigning retrieve movie list to 'movieDetailsAsNowShowing' array
        this.movieDetailsAsNowShowing = retrievedMovieDetailsList.returnedData;

        // Assigning 'retrievedNoOfMovies' the array length of 'movieDetailsAsNowShowing'
        this.retrievedNoOfMovies = this.movieDetailsAsNowShowing.length;
        
        // Assigning 'noOfResultsFoundText' to true (adds number of movie available text section)
        this.noOfResultsFoundText = true;

      }
      else if(retrievedMovieDetailsList.message == "No movies available"){

        // Assigning 'loadingSpinnerNowShowingMovies' to false (stops loading spinner)
        this.loadingSpinnerNowShowingMovies = false;

        // Assigning 'noMovieAvailableText' to true (adds no movie available text section)
        this.noMovieAvailableText = true;

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerNowShowingMovies' to false (stops loading spinner)
      this.loadingSpinnerNowShowingMovies = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve movie details");
    });

  }
  
}
