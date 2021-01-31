import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.page.html',
  styleUrls: ['./movie-details-modal.page.scss'],
})
export class MovieDetailsModalPage implements OnInit {

  passedMovieId = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController 
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'movieId'
    this.passedMovieId = this.navParams.get('movieId');
  }

  // Implementation to close 'Movie Details' modal
  async closeMovieDetailsModal(){
    await this.modalController.dismiss();
  }

}
