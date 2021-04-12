import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddNewShowingModalPage } from '../../movie-catalog-sub-page/add-new-showing-modal/add-new-showing-modal.page';

@Component({
  selector: 'app-movie-catalog-types-popover',
  templateUrl: './movie-catalog-types-popover.page.html',
  styleUrls: ['./movie-catalog-types-popover.page.scss'],
})
export class MovieCatalogTypesPopoverPage implements OnInit {

  // Declaration | Initialization - string variable to store passedMovieImdbId
  passedMovieImdbId = null;

  // Declaration | Initialization - string variable to store passedMovieDetails
  passedMovieDetails = null;

  // Declaration | Initialization - string variable to store passingMovieCondition
  passedMovieCondition = null;

  // Declaration | Initialization - to store the status of updating the movie status
  updateMovieStatusResponse: Boolean = false;
  
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private managerService: ManagerService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'movieId'
    this.passedMovieImdbId = this.navParams.get('passingMovieImdbId');

    // Assigning variable with passed 'movieDetails'
    this.passedMovieDetails = this.navParams.get('passingMovieDetails');

    // Assigning variable with passed 'movieCondition'
    this.passedMovieCondition = this.navParams.get('passingMovieCondition');
  }

  // Implementation to close 'Movie Catalog Types' popover
  async closeMoveCatalogTypesPopover(){
    await this.popoverController.dismiss(this.updateMovieStatusResponse);
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


  /**
   * ADD TO MOVIE CATALOG (Upcoming)
   */

  // Function - Add movie to movie catalog (upcoming) alert box implementation
  async addMovieToUpcomingAlert( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Add Movie to Movie Catalog (Upcoming) Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            this.addMovieToMovieUpcoming(this.passedMovieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Add selected movie into the movie catalog (Upcoming)
  addMovieToMovieUpcoming(movieImdbId: string){
  
    // Assigning 'updateMovieStatusResponse' status to false
    this.updateMovieStatusResponse = false;

    /**
     * Adding movie under movie status, 'WaitListed'
     */
    // Checking whether the selected movie is already added
    this.managerService.getMovieDetailsFromDB(movieImdbId)
      .subscribe((movieAvailability: any) => {
    
        if(movieAvailability.message === "Movie retrieved"){

          // Checking movie status and taking the necessary actions
          if(movieAvailability.returnedData.movieStatus === "WaitListed"){
            // Requesting confirmation to move movie from wait list to movie catalog (upcoming)
            this.updateMovieStatusAlert("Movie Is On Wait List", "Do you want to move movie to movie catalog (Upcoming)?", movieAvailability.returnedData._id, movieImdbId, "Upcoming");
          }
          else if(movieAvailability.returnedData.movieStatus === "Upcoming"){
            // Showing message box to the user
            this.alertNotice("Movie Exists", `"${movieAvailability.returnedData.movieTitle}", is already added to movie catalog (Upcoming).`);
          }
          else if(movieAvailability.returnedData.movieStatus === "NowShowing"){
            // Showing message box to the user
            this.alertNotice("Movie Exists", `"${movieAvailability.returnedData.movieTitle}", is already added to movie catalog (Now Showing).`);
          }

        }
        else if(movieAvailability.message === "Movie not available"){

          // Retrieving the movie details from the omdb api
          this.managerService.getMovieDetailsForOneMovie(movieImdbId)
          .subscribe((retrievedMovieDetails: MovieDetails) => {

            if(retrievedMovieDetails.Response === "True"){
              
              // Adding movie to the database under 'upcoming'
              this.managerService.addMovie(retrievedMovieDetails, "Upcoming")
                .subscribe((retrievedMovieResponse: any) => {

                  if(retrievedMovieResponse.message === "Movie Added As Upcoming"){

                    // Assigning 'updateMovieStatusResponse' status to true
                    this.updateMovieStatusResponse = true;
                    
                    // Showing successful message box to the user
                    this.alertNotice("Movie Added", `"${retrievedMovieResponse.returnedData.movieTitle}" added as 'Upcoming'`);

                    // Closing the popover
                    this.closeMoveCatalogTypesPopover();

                  }
                  else{
                    // Showing error message box to the user
                    this.alertNotice("ERROR", "Unable to add movie as 'Upcoming', apologies for the inconvenience. Please contact administrator.");

                    console.log("Unable to add movie");
                  }

                }, (error: ErrorEvent) => {
                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to add movie as 'Upcoming', apologies for the inconvenience. Please contact administrator.");

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

  // Function - Update movie status to movie catalog (upcoming) request alert box implementation
  async updateMovieStatusAlert( title: string, content: string, movieObjectId: string, movieImdbId: string, movieStatus: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Update Movie Status Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {

            if(movieStatus == "NowShowing"){
              this.openAddNewShowingModal(movieObjectId, movieImdbId, this.passedMovieCondition);
            }
            else{
              this.updateMovieStatus(movieImdbId, movieStatus);
            }

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Implementation for opening the 'Add New Showing' modal
  async openAddNewShowingModal(movieObjectId: string, movieImdbId: string, movieCondition: string){
    const addNewShowingModal = await this.modalController.create({
      component: AddNewShowingModalPage,
      cssClass: 'add-new-showing-modal',
      componentProps: {
        passingMovieObjectId: movieObjectId,
        passingMovieImdbId: movieImdbId,
        passingMovieCondition: movieCondition
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addNewShowingModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await addNewShowingModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Assigning 'updateMovieStatusResponse' status to true
        this.updateMovieStatusResponse = true;

        
        this.updateMovieStatus(movieImdbId, "NowShowing");
      }
    }
  }
  
  // Function - Update movie status 
  updateMovieStatus(movieImdbId: string, movieStatus: string) {

    // Assigning 'updateMovieStatusResponse' status to false
    this.updateMovieStatusResponse = false;

    // Updating movie status
    this.managerService.updateMovieStatus(movieImdbId, movieStatus)
    .subscribe((updatedMovieDetails: any) => {
 
      if(updatedMovieDetails.message !== "Movie status updated"){
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to update movie status");
      }
      else{
        // Assigning 'updateMovieStatusResponse' status to true
        this.updateMovieStatusResponse = true;

        // Showing success message box to the user
        this.alertNotice("Movie Updated", `Movie was moved to movie catalog (${movieStatus == "Upcoming" ? "Upcoming" : "Now Showing"})`);

        console.log(`Movie was moved to movie catalog (${movieStatus == "Upcoming" ? "Upcoming" : "Now Showing"})`);

        // Closing the popover
        this.closeMoveCatalogTypesPopover();
      }

    },
    (error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to update movie status: ", error);
    });

  }


  /**
   * ADD TO MOVIE CATALOG (Now Showing)
   */

  // Function - Add movie to movie catalog (Now Showing) alert box implementation
  async addMovieToNowShowingAlert( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Add Movie to Movie Catalog (Now Showing) Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            // Checking the availability of the movie in the database and assigned the relevant path
            this.addMovieToMovieNowShowing(this.passedMovieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Add selected movie into the movie catalog (Now Showing)
  addMovieToMovieNowShowing(movieImdbId: string){
  
    // Assigning 'updateMovieStatusResponse' status to false
    this.updateMovieStatusResponse = false;

    /**
     * Adding new movie to movie catalog (Now Showing)
     */
    // Checking whether the selected movie is already added
    this.managerService.getMovieDetailsFromDB(movieImdbId)
      .subscribe((movieAvailability: any) => {

        if(movieAvailability.message === "Movie retrieved"){

          // Checking movie status and taking the necessary actions
          if(movieAvailability.returnedData.movieStatus === "WaitListed"){
            // Requesting confirmation to move movie from wait list to movie catalog (now showing)
            this.updateMovieStatusAlert("Movie Is On Wait List", "Do you want to move movie to movie catalog (Now Showing)?", movieAvailability.returnedData._id, movieImdbId, "NowShowing");
          }
          else if(movieAvailability.returnedData.movieStatus === "Upcoming"){
            // Requesting confirmation to move movie from wait list to movie catalog (now showing)
            this.updateMovieStatusAlert("Movie Is On Movie Catalog (Upcoming)", "Do you want to move movie to movie catalog (Now Showing)?", movieAvailability.returnedData._id, movieImdbId, "Now Showing");
          }
          else if(movieAvailability.returnedData.movieStatus === "NowShowing"){
            // Showing message box to the user
            this.alertNotice("Movie Exists", `"${movieAvailability.returnedData.movieTitle}", is already added to movie catalog (Now Showing).`);
          }

        }
        else if(movieAvailability.message === "Movie not available"){

          this.openAddNewShowingModal("0000", movieImdbId, this.passedMovieCondition);

        }
      },
      (error: ErrorEvent) => {
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve results: ", error);
      }
    );

  }



}
