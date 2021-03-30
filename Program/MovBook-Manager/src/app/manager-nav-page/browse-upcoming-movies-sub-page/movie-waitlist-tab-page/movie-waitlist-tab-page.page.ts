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

  // Declaration | Initialization - to store retrieved movie wait list
  movieWaitList: String = "";

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private managerService: ManagerService
  ) { }

  ngOnInit() {
  
    // Retrieving movie wait list from the backend
    this.retrieveMovieWaitList();

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


  // Function - Retrieving movie wait list from the database
  retrieveMovieWaitList(){

    /**
     * Retrieving the movie wait list from the backend
     */
    this.managerService.getMovieWaitList("0000")
      .subscribe((retrievedMovieWaitList: any) => {
        
        if(retrievedMovieWaitList.message == "Movie wait list retrieved"){
          this.movieWaitList = retrievedMovieWaitList;
        }
        else{
          this.alertNotice("Error", "Unable to retrieve movie wait list");
        }

      })

  }

}
