import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddHallModalPage } from '../add-hall-modal/add-hall-modal.page';

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
    private managerService: ManagerService
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'passingCinemaLocationObjectId'
    this.passedCinemaLocationObjectId = this.navParams.get('passingCinemaLocationObjectId');

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
    this.managerService.retrieveCinemaHalls(this.passedCinemaLocationObjectId).subscribe((res) => {

      // Assigning retrieved list of cinema locations to 'cinemaHallList' array
      this.cinemaHallList = res;

      // TODO:
      // if(this.cinemaHallList.message == ""){}

      // Reassigning returnData array from 'cinemaHallList' to 'cinemaHallList'
      this.cinemaHallList = this.cinemaHallList.returnedData;
      
      // Assigning default active cinema hall object Id
      this.setActiveCinemaHallObjectId(this.cinemaHallList[0]._id);

      // Disabling 'loadingSpinnerCinemaHalls' loading spinner
      this.loadingSpinnerCinemaHalls = false;

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

}
