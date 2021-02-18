import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AddHallModalPage } from '../add-hall-modal/add-hall-modal.page';

@Component({
  selector: 'app-cinema-halls-modal',
  templateUrl: './cinema-halls-modal.page.html',
  styleUrls: ['./cinema-halls-modal.page.scss'],
})
export class CinemaHallsModalPage implements OnInit {

  passedCinemaId = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController 
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'cinemaId'
    this.passedCinemaId = this.navParams.get('passingCinemaId');
  }

  // Implementation to close 'Cinema Halls' modal
  async closeCinemaHallsModal(){
    await this.modalController.dismiss();
  }

  // Implementation for opening the 'Add Hall' modal
  async openAddHallModal(){
    this.closeCinemaHallsModal();
    const addHallModal = await this.modalController.create({
      component: AddHallModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passedCinemaId: this.passedCinemaId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addHallModal.present();
  }

}
