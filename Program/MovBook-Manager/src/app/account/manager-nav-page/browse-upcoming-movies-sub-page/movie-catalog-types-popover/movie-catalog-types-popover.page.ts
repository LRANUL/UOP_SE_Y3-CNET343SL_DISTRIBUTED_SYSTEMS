import { Component, OnInit } from '@angular/core';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-movie-catalog-types-popover',
  templateUrl: './movie-catalog-types-popover.page.html',
  styleUrls: ['./movie-catalog-types-popover.page.scss'],
})
export class MovieCatalogTypesPopoverPage implements OnInit {

  // Declaration | Initialization - string variable to store passedMovieId
  passedMovieId = null;

  // Declaration | Initialization - string variable to store passedMovieDetails
  passedMovieDetails = null;
  
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'movieId'
    this.passedMovieId = this.navParams.get('movieId');

    // Assigning variable with passed 'movieDetails'
    this.passedMovieDetails = this.navParams.get('movieDetails');
  }

  // Implementation to close 'Movie Catalog Types' popover
  async closeMoveCatalogTypesPopover(){
    await this.popoverController.dismiss();
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

  // Function - Add movie to movie catalog (upcoming) alert box implementation
  async addMovieToUpcomingAlert( title: string, content: string, movieImdbId: string ) {
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
            
            this.addMovieToMovieUpcoming(movieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Add selected movie into the movie upcoming
  addMovieToMovieUpcoming(movieImdbId: string){
   
    /**
     * Adding movie under movie status, 'WaitListed'
     */
    // Checking whether the selected movie is already added
    this.managerService.getMovieDetailsFromDB(movieImdbId)
      .subscribe((movieAvailability: any) => {
        console.log(movieAvailability);
        if(movieAvailability.message === "Movie retrieved"){

          // Checking movie status and taking the necessary actions
          if(movieAvailability.returnedData.movieStatus === "WaitListed"){
            // Requesting confirmation to move movie from wait list to movie catalog (upcoming)
            this.addMovieToUpcomingFromWaitListAlert("Movie Is On Wait List", "Do you want to move movie to movie catalog (Upcoming)?", movieImdbId);
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
              this.managerService.addMovieAsUpcoming(retrievedMovieDetails)
                .subscribe((retrievedMovieResponse: any) => {

                  if(retrievedMovieResponse.message === "Movie Added As Upcoming"){

                    // Showing successful message box to the user
                    this.alertNotice("Movie Added", `"${retrievedMovieResponse.returnedData.movieTitle}" added as 'Upcoming'`);

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
  async addMovieToUpcomingFromWaitListAlert( title: string, content: string, movieImdbId: string ) {
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
            
            this.updateMovieToUpcoming(movieImdbId);

          }
        }
      ]
    });
    await alert.present();
  }
  
  // Function - Update movie status from WaitListed to Movie Catalog(Upcoming)
  updateMovieToUpcoming(movieImdbId: string) {

    // Retrieving the movie details from the omdb api
    this.managerService.updateMovieStatus(movieImdbId, "Upcoming")
    .subscribe((updatedMovieDetails: any) => {

      if(updatedMovieDetails.message !== "Movie status updated"){
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to update movie status");
      }
      else{
        // Showing success message box to the user
        this.alertNotice("Movie Updated", "Movie was moved to movie catalog (Upcoming) from wait list.");

        console.log("Movie was moved to movie catalog (Upcoming) from wait list.");
      }

    },
    (error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to update movie status: ", error);
    });

  }


}
