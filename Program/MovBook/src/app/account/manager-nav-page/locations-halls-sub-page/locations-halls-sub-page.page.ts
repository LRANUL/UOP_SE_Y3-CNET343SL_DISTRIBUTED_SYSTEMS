import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddLocationModalPage } from './add-location-modal/add-location-modal.page';
import { CinemaHallsModalPage } from './cinema-halls-modal/cinema-halls-modal.page';

@Component({
  selector: 'app-locations-halls-sub-page',
  templateUrl: './locations-halls-sub-page.page.html',
  styleUrls: ['./locations-halls-sub-page.page.scss'],
})
export class LocationsHallsSubPagePage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  // Implementation for opening the 'Add Location' modal
  async openAddLocationModal(){
    const addLocationModal = await this.modalController.create({
      component: AddLocationModalPage,
      cssClass: 'add-location-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addLocationModal.present();
  }

  // Implementation for opening the 'Cinema Locations Modal' modal
  async openCinemaLocationsModal(cinemaLocationId: string){
    const cinemaLocationsModal = await this.modalController.create({
      component: CinemaHallsModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingCinemaLocationId: cinemaLocationId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    cinemaLocationsModal.present();
  }

}
