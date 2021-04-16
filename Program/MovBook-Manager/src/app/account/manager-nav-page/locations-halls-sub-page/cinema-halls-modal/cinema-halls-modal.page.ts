import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddHallModalPage } from '../add-hall-modal/add-hall-modal.page';
import { EditHallModalPage } from '../edit-hall-modal/edit-hall-modal.page';

@Component({
  selector: 'app-cinema-halls-modal',
  templateUrl: './cinema-halls-modal.page.html',
  styleUrls: ['./cinema-halls-modal.page.scss'],
})
export class CinemaHallsModalPage implements OnInit {

  // Declaration | Initialization - storing passed cinemaLocationObjectId value
  passedCinemaLocationObjectId = null;

  // Declaration - stores list of cinema halls
  cinemaHallList;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaHalls' block
  loadingSpinnerCinemaHalls: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerHallRemove' block
  loadingSpinnerHallRemove: Boolean = false;

  // Declaration - stores the initially loaded and user selected cinema hall object Id
  activeCinemaHallObjectId;

  // Declaration - stores all seating details of initially loaded and user selected cinema hall
  activeSeatLayout = [];

  // Declaration - stores number of allocated seats of initially loaded and user selected cinema hall
  noOfAllocatedSeats;

  // Declaration - stores number of active seats of initially loaded and user selected cinema hall
  noOfActiveSeats;

  // Declaration - stores number of unavailable seats of initially loaded and user selected cinema hall
  noOfUnavailableSeats;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning variable with passed 'passingCinemaLocationObjectId'
    this.passedCinemaLocationObjectId = this.navParams.get('passingCinemaLocationObjectId');

    // Assigning variable with passed 'passingCinemaHallObjectId'
    this.activeCinemaHallObjectId = this.navParams.get('passingCinemaHallObjectId');

    // Retrieving cinema hall details
    this.retrieveCinemaHallDetails();

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
        passingCinemaLocationObjectId: this.passedCinemaLocationObjectId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addHallModal.present();
  }

  // Function - Implementation for opening the 'Edit Hall' modal
  async openEditHallModal(){
    this.closeCinemaHallsModal();
    const editHallModal = await this.modalController.create({
      component: EditHallModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingCinemaLocationObjectId: this.passedCinemaLocationObjectId,
        passingCinemaHallObjectId: this.activeCinemaHallObjectId,
        passingListOfCinemaHall: this.cinemaHallList
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    editHallModal.present();
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

  // Function - Coverts a number value to any array
  covertNumberToArray(value: number) {
    // Converting the 'value' parameter to an array and returning
    return new Array(value);
  }

  // Function - Incrementing value before execution
  preIncrementValue(value: number){
    // Pre increment - incrementing one to 'value' before the execution and returning the value
    return ++value;
  }

  // Function - Setting active cinema hall object Id when cinema hall button is clicked
  setActiveCinemaHallObjectId(cinemaHallObjectId: String){

    // Assigning activeCinemaHallObjectId using the passed cinemaHallObjectId
    this.activeCinemaHallObjectId = cinemaHallObjectId;

    // Generating array of seating layout for selected cinema hall
    this.generateActiveSeatLayout();

  }

  // Function - Retrieving cinema hall details
  retrieveCinemaHallDetails(){
    
    // Activating 'loadingSpinnerCinemaHalls' loading spinner
    this.loadingSpinnerCinemaHalls = true;

    // Retrieving cinema halls from the server-side application
    this.managerService.retrieveCinemaHalls(this.passedCinemaLocationObjectId)
      .subscribe((cinemaHallsResponse: any) => {

      if(cinemaHallsResponse.message == "Cinema halls Retrieved"){
        // Assigning returnData array from 'cinemaHallsResponse' to 'cinemaHallList'
        this.cinemaHallList = cinemaHallsResponse.returnedData;
        
        // Assigning default active cinema hall object Id
        this.setActiveCinemaHallObjectId(this.cinemaHallList[0]._id);
      }
      else if(cinemaHallsResponse.message == "No cinema halls available for cinema location"){
        // Showing error message box to the user
        this.alertNotice("No Cinema Halls", "No cinema hall available for this cinema location.");
      }

      // Disabling 'loadingSpinnerCinemaHalls' loading spinner
      this.loadingSpinnerCinemaHalls = false;

    }, (error: ErrorEvent) => {
      // Disabling 'loadingSpinnerCinemaHalls' loading spinner
      this.loadingSpinnerCinemaHalls = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve cinema hall details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve cinema hall details");
    });

  }

  // Function - extract cinema hall seating details for the initially loaded or user selected cinema hall
  generateActiveSeatLayout(){

    // Resetting 'activeSeatLayout' to initial state (empty)
    this.activeSeatLayout = [];

    // Resetting 'noOfAllocatedSeats' to initial state (0)
    this.noOfAllocatedSeats = 0;

    // Resetting 'noOfActiveSeats' to initial state (0)
    this.noOfActiveSeats = 0;

    // Resetting 'noOfUnavailableSeats' to initial state (0)
    this.noOfUnavailableSeats = 0;

    // For loop - iterating through all cinema halls for selected cinema location
    for (let hallSeatingLayout = 0; hallSeatingLayout < this.cinemaHallList.length; hallSeatingLayout++) {
      
      // If condition - checking whether the currently active cinema hall object Id is equal when iterating through the loop
      if(this.activeCinemaHallObjectId == this.cinemaHallList[hallSeatingLayout]._id){
        
        // Assigning cinema hall details to 'activeSeatLayout' array
        this.activeSeatLayout = this.cinemaHallList[hallSeatingLayout];

        // Foreach loop - iterating through each seat in the cinema hall
        this.cinemaHallList[hallSeatingLayout].seatingDetails.forEach(seatDetails => {
          
          // Post increment - incrementing one to 'noOfAllocatedSeats' after the execution in each iteration
          this.noOfAllocatedSeats++;

          // If condition - checking which seats in the cinema hall has 'seatActive' as true
          if(this.cinemaHallList[hallSeatingLayout].seatingDetails[this.noOfAllocatedSeats - 1].seatActive == true){
            // Post increment - incrementing one to 'noOfActiveSeats' after the execution in each iteration
            this.noOfActiveSeats++;
          }

          // If condition - checking which seats in the cinema hall has 'seatUnavailable' as true
          if(this.cinemaHallList[hallSeatingLayout].seatingDetails[this.noOfAllocatedSeats - 1].seatUnavailable == true){
            // Post increment - incrementing one to 'noOfUnavailableSeats' after the execution in each iteration
            this.noOfUnavailableSeats++;
          }
        });
       
      }
      
    }
    
  }

  // Confirm Box Implementation - Remove cinema hall
  async confirmBoxRemoveHall (title: string, content: string, cinemaHallObjectId: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Confirm Box: Request denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Confirm Box: Request accepted");

            // Edit cinema hall details
            this.removeCinemaHall(cinemaHallObjectId);
          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Remove cinema hall from the database
  removeCinemaHall(cinemaHallObjectId){

    // Assigning 'loadingSpinnerHallRemove' to true (starts loading spinner)
    this.loadingSpinnerHallRemove = true;

    // Adding new showing experience
    this.managerService.removeCinemaHall(cinemaHallObjectId)
      .subscribe((cinemaHallRemoveResponse: any) => {

      if(cinemaHallRemoveResponse.message == "Count of movies retrieved"){

        // Assigning 'loadingSpinnerHallRemove' to false (stops loading spinner)
        this.loadingSpinnerHallRemove = false;

        // Showing success message box to the user
        this.alertNotice("Removed", "Cinema hall has been successfully removed.");

      }
      else if(cinemaHallRemoveResponse.message == "Unable to retrieve count of movies"){

        // Assigning 'loadingSpinnerHallRemove' to false (stops loading spinner)
        this.loadingSpinnerHallRemove = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to remove cinema hall, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to remove cinema hall");

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerHallRemove' to false (stops loading spinner)
      this.loadingSpinnerHallRemove = false;
      
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to remove cinema hall, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to remove cinema hall");
    });

  }


}
