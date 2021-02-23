import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AddHallModalPage } from '../add-hall-modal/add-hall-modal.page';

@Component({
  selector: 'app-cinema-halls-modal',
  templateUrl: './cinema-halls-modal.page.html',
  styleUrls: ['./cinema-halls-modal.page.scss'],
})
export class CinemaHallsModalPage implements OnInit {

  // Declaration | Initialization - storing passed cinemaLocationId value
  passedCinemaLocationId = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController 
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'cinemaLocationId'
    this.passedCinemaLocationId = this.navParams.get('passingCinemaLocationId');
  }

  // Function - Implementation to close 'Cinema Halls' modal
  async closeCinemaHallsModal(){
    await this.modalController.dismiss();
  }

  // Function - Implementation for opening the 'Add Hall' modal
  async openAddHallModal(){
    this.closeCinemaHallsModal();
    const addHallModal = await this.modalController.create({
      component: AddHallModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passedCinemaLocationId: this.passedCinemaLocationId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addHallModal.present();
  }

}
