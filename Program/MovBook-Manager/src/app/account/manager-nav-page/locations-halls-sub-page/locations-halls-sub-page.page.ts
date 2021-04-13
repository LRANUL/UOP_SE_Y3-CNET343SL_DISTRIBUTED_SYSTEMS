import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddLocationModalPage } from './add-location-modal/add-location-modal.page';
import { CinemaHallsModalPage } from './cinema-halls-modal/cinema-halls-modal.page';
import { EditLocationModalPage } from './edit-location-modal/edit-location-modal.page';

@Component({
  selector: 'app-locations-halls-sub-page',
  templateUrl: './locations-halls-sub-page.page.html',
  styleUrls: ['./locations-halls-sub-page.page.scss'],
})
export class LocationsHallsSubPagePage implements OnInit {

  // Declaration - FormGroup to handle searchCinemaLocationForm form
  searchCinemaLocationForm: FormGroup;

  // Declaration - stores list of cinema locations
  cinemaLocationList = [];

  // Declaration - stores used selected Cinema Location's object ID
  selectedCinemaLocationObjectId;

  // Declaration - stores the search results for the user selected cinema location
  searchResultCinemaLocation;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaLocations' block
  loadingSpinnerCinemaLocations: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'handleListOfCinemaLocations' block
  handleListOfCinemaLocations: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'handleUserSelectedCinemaLocation' block
  handleUserSelectedCinemaLocation: Boolean = false;

  // Declaration | Initialization - to store a list of number of cinema halls
  listOfAmountOfCinemaHalls = new Array();

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning form validation
    this.searchCinemaLocationForm = this.formBuilder.group({
      cinemaLocationName: new FormControl('', Validators.required)
    });

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

  // Function - Implementation for opening the 'Edit Location' modal
  async openEditLocationModal(cinemaLocationDetails: any){
    const editLocationModal = await this.modalController.create({
      component: EditLocationModalPage,
      cssClass: 'add-location-modal',
      componentProps: {
        passingCinemaLocation: cinemaLocationDetails
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    editLocationModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await editLocationModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        if(this.handleUserSelectedCinemaLocation == true){
          // Re-initializing array
          this.cinemaLocationList = [];
          this.listOfAmountOfCinemaHalls = new Array();
          // Retrieving updated list of cinema locations
          this.retrieveCinemaLocations();
          this.searchCinemaLocation(this.selectedCinemaLocationObjectId);
        }
        else{
          // Re-initializing array
          this.cinemaLocationList = [];
          this.listOfAmountOfCinemaHalls = new Array();
          // Retrieving updated list of cinema locations
          this.retrieveCinemaLocations();
        }
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

    // Removing visibility to 'handleListOfCinemaLocations' block
    this.handleListOfCinemaLocations = false

    // Declaration | Initialization - to store cinema location object ID and number of cinema halls
    let numberOfCinemaHallsObject = {
      cinemaLocationObjectId: null,
      noOfCinemaHalls: null
    };

    // Activating 'loadingSpinnerCinemaLocations' loading spinner
    this.loadingSpinnerCinemaLocations = true;

    // Retrieving list of cinema locations
    this.managerService.retrieveCinemaLocations()
      .subscribe((cinemaLocationList: any) => {

        if(cinemaLocationList.message == "Cinema locations retrieved"){
          
          // For loop - Iterating through the returned cinema locations to retrieve the number of cinema halls
          for (let cinemaLocationIndex = 0; cinemaLocationIndex < cinemaLocationList.returnedData.length; cinemaLocationIndex++) {
           
            // Retrieving the cinema halls for each cinema location
            this.managerService.retrieveCinemaHalls(cinemaLocationList.returnedData[cinemaLocationIndex]._id)
              .subscribe((cinemaHallsResponse: any) => {

                // Defining cinema location object ID and number of cinema halls
                numberOfCinemaHallsObject = {
                  cinemaLocationObjectId: cinemaLocationList.returnedData[cinemaLocationIndex]._id,
                  noOfCinemaHalls: cinemaHallsResponse.returnedData ? cinemaHallsResponse.returnedData.length : "0"
                };

                // Adding 'numberOfCinemaHallsObject' object into the 'listOfAmountOfCinemaHalls' array
                this.listOfAmountOfCinemaHalls.push(numberOfCinemaHallsObject);

              }, (error: ErrorEvent) => {
                // Showing error message box to the user
                this.alertNotice("ERROR", "Unable to retrieve cinema halls, apologies for the inconvenience. Please contact administrator.");

                console.log("Unable to retrieve cinema halls: ", error);
              });

          }
          
          // Assigning retrieved list of cinema locations to 'cinemaLocationList' array
          this.cinemaLocationList = cinemaLocationList.returnedData;

          // Disabling 'loadingSpinnerCinemaLocations' loading spinner
          this.loadingSpinnerCinemaLocations = false;

          // Showing visibility to 'handleListOfCinemaLocations' block
          this.handleListOfCinemaLocations = true
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

  // Filtering the cinema locations to render the user selected cinema location
  searchCinemaLocation(selectedCinemaLocationObjectId){
    
    // Defining 'selectedCinemaLocationObjectId' with the user selected cinema location name
    this.selectedCinemaLocationObjectId = selectedCinemaLocationObjectId;

    // Hiding visibility to 'handleUserSelectedCinemaLocation' block
    this.handleUserSelectedCinemaLocation = false

    for (let cinemaLocationIndex = 0; cinemaLocationIndex < this.cinemaLocationList.length; cinemaLocationIndex++) {

      if(this.cinemaLocationList[cinemaLocationIndex]._id == selectedCinemaLocationObjectId){

        this.searchResultCinemaLocation = this.cinemaLocationList[cinemaLocationIndex];

        // Removing visibility to 'handleListOfCinemaLocations' block
        this.handleListOfCinemaLocations = false

        // Showing visibility to 'handleUserSelectedCinemaLocation' block
        this.handleUserSelectedCinemaLocation = true

      }
      
    }

  }

  // Function - Implementation to reset 'Cinema Location and Halls' to initial state
  resetSearchCinemaLocationForm(){

    // Resetting 'searchCinemaLocationForm'
    this.searchCinemaLocationForm.reset();

    // Hiding visibility to 'handleUserSelectedCinemaLocation' block
    this.handleUserSelectedCinemaLocation = false

    // Showing visibility to 'handleListOfCinemaLocations' block
    this.handleListOfCinemaLocations = true

  }

  
}
