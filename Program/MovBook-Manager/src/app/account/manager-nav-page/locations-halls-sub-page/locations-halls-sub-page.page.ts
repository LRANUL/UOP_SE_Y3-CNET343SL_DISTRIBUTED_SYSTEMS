import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Retrieving list of cinema locations upon page load
    this.retrieveCinemaLocations();

  }

  // Function -  Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
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
    this.managerService.retrieveCinemaLocations()
      .subscribe((cinemaLocationList: any) => {

        if(cinemaLocationList.message == "Cinema locations retrieved"){
          // Assigning retrieved list of cinema locations to 'cinemaLocationList' array
          this.cinemaLocationList = cinemaLocationList.returnedData;

          // Disabling 'loadingSpinnerCinemaLocations' loading spinner
          this.loadingSpinnerCinemaLocations = false;
        }
        else{
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to retrieve cinema location details, apologies for the inconvenience. Please contact administrator.");

          console.log("Unable to retrieve cinema location details");
        }

    },(error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve cinema location details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve cinema location details: ", error);
    });

  }

  
}
