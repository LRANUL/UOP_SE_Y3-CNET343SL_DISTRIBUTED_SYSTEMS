import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { MovieDetailsModalPage } from '../movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-search-movies-tab-page',
  templateUrl: './search-movies-tab-page.page.html',
  styleUrls: ['./search-movies-tab-page.page.scss'],
})
export class SearchMoviesTabPagePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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

  // Add Movie to Waitlist Alert Box Implementation
  async addMovieToWaitListAlert( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Add Movie to Waitlist Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            // Add movie details to the waitlist
            // TODO: Connect to the backend

          }
        }
      ]
    });
    await alert.present();
  }

}
