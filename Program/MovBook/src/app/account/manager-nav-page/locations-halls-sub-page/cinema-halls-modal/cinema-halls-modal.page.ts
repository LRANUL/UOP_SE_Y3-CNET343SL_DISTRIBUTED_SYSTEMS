import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cinema-halls-modal',
  templateUrl: './cinema-halls-modal.page.html',
  styleUrls: ['./cinema-halls-modal.page.scss'],
})
export class CinemaHallsModalPage implements OnInit {

  passedCinemaLocationId = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController 
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'cinemaLocationId'
    this.passedCinemaLocationId = this.navParams.get('passingCinemaLocationId');
  }

  // Implementation to close 'Cinema Halls' modal
  async closeCinemaHallsModal(){
    await this.modalController.dismiss();
  }

}
