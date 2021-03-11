import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CinemaLocation } from 'src/app/models/account/manager/cinema-location';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddLocationModalPage } from './add-location-modal/add-location-modal.page';
import { CinemaHallsModalPage } from './cinema-halls-modal/cinema-halls-modal.page';

@Component({
  selector: 'app-locations-halls-sub-page',
  templateUrl: './locations-halls-sub-page.page.html',
  styleUrls: ['./locations-halls-sub-page.page.scss'],
})
export class LocationsHallsSubPagePage implements OnInit {

  // Declaration - stores list of cinema locations
  cinemaLocationList = [];

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaLocations' block
  loadingSpinnerCinemaLocations: Boolean = false;

  constructor(
    private modalController: ModalController,
    private managerService: ManagerService
  ) { }

  ngOnInit() {

    // Retrieving list of cinema locations upon page load
    this.retrieveCinemaLocations();

  }

  // Function - Implementation for opening the 'Add Location' modal
  async openAddLocationModal(){
    const addLocationModal = await this.modalController.create({
      component: AddLocationModalPage,
      cssClass: 'add-location-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addLocationModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await addLocationModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Retrieving updated list of cinema locations
        this.retrieveCinemaLocations();
      }
    }
  }

  // Function - Implementation for opening the 'Cinema Halls Modal' modal
  async openCinemaHallsModal(cinemaLocationObjectId: string){
    const cinemaHallsModal = await this.modalController.create({
      component: CinemaHallsModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingCinemaLocationObjectId: cinemaLocationObjectId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    cinemaHallsModal.present();
  }

  // Function - Retrieving cinema locations from the server-side
  retrieveCinemaLocations(){

    // Activating 'loadingSpinnerCinemaLocations' loading spinner
    this.loadingSpinnerCinemaLocations = true;

    // Retrieving list of cinema locations
    this.managerService.retrieveCinemaLocations().subscribe((res) => {

      // Assigning retrieved list of cinema locations to 'cinemaLocationList' array
      this.cinemaLocationList = res as CinemaLocation[];

      // Disabling 'loadingSpinnerCinemaLocations' loading spinner
      this.loadingSpinnerCinemaLocations = false;

    });
  }

}
