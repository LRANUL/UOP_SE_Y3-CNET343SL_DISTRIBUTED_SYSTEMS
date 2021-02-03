import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.page.html',
  styleUrls: ['./movie-details-modal.page.scss'],
})
export class MovieDetailsModalPage implements OnInit {

  setButtonGridToVisible = false;
  passedModalOpenPath = null;
  passedMovieId = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController 
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'modalOpenPath'
    this.passedModalOpenPath = this.navParams.get('passingModalOpenPath');
    // Checking whether the modal open path is correct to show buttons grid
    if(this.passedModalOpenPath == 'Public|Customer-Movie-Details'){
      this.setButtonGridToVisible = true;
    }

    // Assigning variable with passed 'movieId'
    this.passedMovieId = this.navParams.get('passingMovieId');
  }

  // Implementation to close 'Movie Details' modal
  async closeMovieDetailsModal(){
    await this.modalController.dismiss();
  }

}
