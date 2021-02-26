import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-movie-catalog-types-popover',
  templateUrl: './movie-catalog-types-popover.page.html',
  styleUrls: ['./movie-catalog-types-popover.page.scss'],
})
export class MovieCatalogTypesPopoverPage implements OnInit {

  // Declaration | Initialization - string variable to store passedMovieId
  passedMovieId = null;
  
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'movieId'
    this.passedMovieId = this.navParams.get('movieId');
  }

  // Implementation to close 'Movie Catalog Types' popover
  async closeMoveCatalogTypesPopover(){
    await this.popoverController.dismiss();
  }

}
