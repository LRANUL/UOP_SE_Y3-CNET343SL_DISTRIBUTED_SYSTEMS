import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { MovieCatalogTypesPopoverPage } from '../movie-catalog-types-popover/movie-catalog-types-popover.page';
import { MovieDetailsModalPage } from '../movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-movie-waitlist-tab-page',
  templateUrl: './movie-waitlist-tab-page.page.html',
  styleUrls: ['./movie-waitlist-tab-page.page.scss'],
})
export class MovieWaitlistTabPagePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
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

}
