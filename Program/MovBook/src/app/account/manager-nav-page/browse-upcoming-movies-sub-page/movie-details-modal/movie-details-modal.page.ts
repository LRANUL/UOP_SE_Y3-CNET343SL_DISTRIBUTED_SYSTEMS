import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { MovieCatalogTypesPopoverPage } from '../movie-catalog-types-popover/movie-catalog-types-popover.page';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.page.html',
  styleUrls: ['./movie-details-modal.page.scss'],
})
export class MovieDetailsModalPage implements OnInit {

  // Declaration | Initialization - string variable to store passedMovieId
  passedMovieId = null;

  // Declaration | Initialization - string variable to store passedModalOpenPath
  passedModalOpenPath = null;

  // Declaration | Initialization - boolean variable to store visibility of 'setButtonGridToVisibleCustomer' block
  setButtonGridToVisibleCustomer = false;

  // Declaration | Initialization - boolean variable to store visibility of 'setButtonGridToVisibleManager' block
  setButtonGridToVisibleManager = false;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController ,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
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

    // Assigning variable with passed 'movieId'
    this.passedMovieId = this.navParams.get('passingMovieId');
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
        movieId: '<SAMPLE VALUE>'
      },
      event: evt
    });
    movieCatalogTypesPopover.present();
  }

}
