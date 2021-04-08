import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CinemaLocation } from 'src/app/models/account/manager/cinema-location';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-add-new-showing-modal',
  templateUrl: './add-new-showing-modal.page.html',
  styleUrls: ['./add-new-showing-modal.page.scss'],
})
export class AddNewShowingModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewShowingForm form
  addNewShowingForm: FormGroup;

  // Declaration - stores list of cinema locations
  cinemaLocationList = new Array();

  // Declaration - stores list of cinema halls
  cinemaHallList = new Array();

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerShowing' block
  loadingSpinnerShowing: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'cinemaLocationSelectionInitialText' block
  cinemaLocationSelectionInitialText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'cinemaHallSelectionInitialText' block
  cinemaHallSelectionInitialText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaHall' block
  loadingSpinnerCinemaHall: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaHallSeatLayout' block
  loadingSpinnerCinemaHallSeatLayout: Boolean = false;

  // Declaration - stores the initially loaded and user selected cinema hall object Id
  activeCinemaHallObjectId;

  // Declaration - stores all seating details of initially loaded and user selected cinema hall
  activeSeatLayout = new Array()

  // Declaration - stores number of allocated seats of initially loaded and user selected cinema hall
  noOfAllocatedSeats;

  // Declaration - stores number of active seats of initially loaded and user selected cinema hall
  noOfActiveSeats;

  // Declaration - stores number of unavailable seats of initially loaded and user selected cinema hall
  noOfUnavailableSeats;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Retrieving list of cinema locations upon page load
    this.retrieveCinemaLocations();

    // Assigning form validation to AddNewShowingForm
    this.addNewShowingForm = this.formBuilder.group({
      cinemaLocationName: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Add New Showing' modal
  async closeAddNewShowingModal(){
    await this.modalController.dismiss();
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

  // Function - Retrieving cinema locations from the server-side
  retrieveCinemaLocations(){

    // Activating 'loadingSpinnerShowing' loading spinner
    this.loadingSpinnerShowing = true;

    // Retrieving list of cinema locations
    this.managerService.retrieveCinemaLocations()
      .subscribe((cinemaLocationList: any) => {

        if(cinemaLocationList.message == "Cinema locations retrieved"){
          // Assigning retrieved list of cinema locations to 'cinemaLocationList' array
          this.cinemaLocationList = cinemaLocationList.returnedData;

          // Disabling 'loadingSpinnerShowing' loading spinner
          this.loadingSpinnerShowing = false;
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

  // Function - Retrieving movie halls for the selected cinema location
  retrieveCinemaHalls(cinemaLocationObjectId: string){

    this.cinemaLocationSelectionInitialText = false;

    this.loadingSpinnerCinemaHall = true;

    // Retrieving list of cinema halls
    this.managerService.retrieveCinemaHalls(cinemaLocationObjectId)
      .subscribe((cinemaHallList: any) => {

        if(cinemaHallList.message == "Cinema halls Retrieved"){
          // Assigning retrieved list of cinema halls to 'cinemaHallList' array
          this.cinemaHallList = cinemaHallList.returnedData;

          // Disabling 'loadingSpinnerShowing' loading spinner
          this.loadingSpinnerShowing = false;

          this.loadingSpinnerCinemaHall = false;
        }
        else if(cinemaHallList.message == "No cinema halls available for cinema location"){
          alert(cinemaHallList.message);

          this.loadingSpinnerCinemaHall = false;
        }
        else{
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to retrieve cinema hall details, apologies for the inconvenience. Please contact administrator.");

          console.log("Unable to retrieve cinema hall details");

          this.loadingSpinnerCinemaHall = false;
        }

    },(error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve cinema hall details, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve cinema hall details: ", error);

      this.loadingSpinnerCinemaHall = false;
    });

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
    this.generateSeatLayout();

  }

  // Function - extract cinema hall seating details for the user selected cinema hall
  generateSeatLayout(){

    this.cinemaHallSelectionInitialText = false;

    this.loadingSpinnerCinemaHallSeatLayout = true;

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

    this.loadingSpinnerCinemaHallSeatLayout = false;
    
  }


}
