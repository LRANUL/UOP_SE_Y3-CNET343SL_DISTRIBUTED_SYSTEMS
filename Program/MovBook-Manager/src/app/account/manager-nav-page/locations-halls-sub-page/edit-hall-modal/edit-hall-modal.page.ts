import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, ModalController, AlertController, PopoverController } from '@ionic/angular';
import { HallSeatDetails } from 'src/app/models/account/manager/cinema-hall';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AssignHallSeatPopoverPage } from '../assign-hall-seat-popover/assign-hall-seat-popover.page';
import { CinemaHallsModalPage } from '../cinema-halls-modal/cinema-halls-modal.page';

@Component({
  selector: 'app-edit-hall-modal',
  templateUrl: './edit-hall-modal.page.html',
  styleUrls: ['./edit-hall-modal.page.scss'],
})
export class EditHallModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewHallForm Form
  editHallForm: FormGroup;
  
  // Declaration | Initialization - To store 'passingCinemaLocationObjectId'
  passedCinemaLocationObjectId = null;

  // Declaration | Initialization - To store 'passingCinemaHallObjectId'
  passedCinemaHallObjectId = null;

  // Declaration | Initialization - string variable to store and process hallSeatId
  hallSeatId = null;

  // Declaration - stores list of cinema halls
  cinemaHallList;
  
  // Declaration - array to store seat details
  hallSeating: Array<HallSeatDetails> = null;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaHalls' block
  loadingSpinnerCinemaHalls: Boolean = false;

  // Declaration - stores the initially loaded and user selected cinema hall object Id
  activeCinemaHallObjectId;

  // Declaration - stores all seating details of initially loaded and user selected cinema hall
  activeSeatLayout;

  // Declaration - stores number of allocated seats of initially loaded and user selected cinema hall
  noOfAllocatedSeats;

  // Declaration - stores number of active seats of initially loaded and user selected cinema hall
  noOfActiveSeats;

  // Declaration - stores number of unavailable seats of initially loaded and user selected cinema hall
  noOfUnavailableSeats;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private managerService: ManagerService
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'passingCinemaLocationObjectId'
    this.passedCinemaLocationObjectId = this.navParams.get('passingCinemaLocationObjectId');

    // Assigning variable with passed 'passingCinemaHallObjectId'
    this.passedCinemaHallObjectId = this.navParams.get('passingCinemaHallObjectId');

    // Assigning variable with passed 'passingCinemaHallObjectId'
    this.activeCinemaHallObjectId = this.passedCinemaHallObjectId

    // Assigning variable with passed 'passingListOfCinemaHall'
    this.cinemaHallList = this.navParams.get('passingListOfCinemaHall');

    // Merging passedCinemaLocationObjectId into hallSeatId
    this.hallSeatId = this.passedCinemaLocationObjectId;

    // Merging hallId into hallSeatId
    this.hallSeatId = this.hallSeatId + "|" + "0";
  
    this.editHallForm = this.formBuilder.group({
      hallName: new FormControl('', Validators.required)
    });

    // Creating cinema hall seat layout
    this.generateActiveSeatLayout();
  
    // Assigning existing value to the 'editHallForm' form
    this.editHallForm.patchValue({
      hallName: this.activeSeatLayout.cinemaHallName
    });
  }


  // Declaration | Initialization - To store number of seats
  noOfSeats: number = 0;

  // Declaration | Initialization - To store number of rows in seat layout grid table
  noOfRows: number = 0;

  // function - assigning seat layout grid table number of rows from the user interface
  setNoOfRows(passedNoOfRows: number){
    this.noOfRows = passedNoOfRows;
  }

  // Declaration | Initialization - To store number of columns in seat layout grid table
  noOfColumns: number = 0;

  // Function - assigning seat layout grid table number of columns from the user interface
  setNoOfColumns(passedNoOfColumns: number){
    this.noOfColumns = passedNoOfColumns;
  }

  // Declaration | Initialization - To enable or disable automatic seat numbering to alphabetical order
  seatNumberAlphabetical : boolean = false;

  // Function - assigning seat number to alphabetical order to enable or disable based on user interface toggle
  setSeatNumberAlphabetical(seatNumberAlphabetical: boolean){
    this.seatNumberAlphabetical = seatNumberAlphabetical;
  }


  // Implementation to close 'Edit Hall Modal'
  async closeEditHallModal(){
    await this.modalController.dismiss();
    this.openCinemaHallsModal();
  }

  // Implementation for opening the 'Cinema Halls Modal'
  async openCinemaHallsModal(){
    const cinemaHallsModal = await this.modalController.create({
      component: CinemaHallsModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingCinemaLocationObjectId: this.passedCinemaLocationObjectId,
        passingCinemaHallObjectId: this.passedCinemaHallObjectId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    cinemaHallsModal.present();
  }

  // Function -  Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK'],
    });
    await alert.present();
  }



  // Implementation for opening the 'AssignHallSeat' popover
  async openAssignHallSeatPopover(evt: Event, seatDetails){
    // Implementation to open popover
    const assignHallSeatPopover = await this.popoverController.create({
      component: AssignHallSeatPopoverPage,
      componentProps: {
        passingSeatObjectId: seatDetails._id,
        passingSeatId: seatDetails.seatId,
        passingSeatActive: seatDetails.seatActive,
        passingSeatNumber: seatDetails.seatNumber,
        passingSeatUnavailable: seatDetails.seatUnavailable,
        passingSeatAllocatedPositionNo: seatDetails.seatAllocatedPositionNo
      },
      event: evt,
      // Disabling popover closing from any outside clicks
      backdropDismiss: false
    });
    // Executing popover open
    assignHallSeatPopover.present();

    // Collecting response data when popover is dismissed
    const { data } = await assignHallSeatPopover.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // Updating hall seating according to the modifications
      this.updateHallSeating(data);
    }
  }



  // Updating hall seating grid table according to the user populated seating attributes
  updateHallSeating(seatDetails: HallSeatDetails){

    let currentSeatingDetails = [];

    currentSeatingDetails = this.activeSeatLayout.seatingDetails;

    // For loop - iterating through the hallSeating array (contain the main seating details)
    for (let hallSeat = 0; hallSeat < currentSeatingDetails.length; hallSeat++) {

      if(currentSeatingDetails[hallSeat].seatId == seatDetails.seatId){
        this.activeSeatLayout.seatingDetails[hallSeat] = seatDetails;
      }

    }

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



  // Implementation to hide or show 'Edit Hall' form customization section
  editHallCustomizationVisibility(){
    // Retrieving 'editHallFormCustomizationSection' element
    let customizationSectionId = document.getElementById("editHallFormCustomizationSection");
    // Retrieving 'addNewHallFormCustomizationSection' section visibility button image
    let visibilityButtonImage = <HTMLImageElement>document.getElementById("visibilityButtonImage");
    // Retrieving 'addNewHallFormCustomizationSection' section visibility button text
    let visibilityButtonText = document.getElementById("visibilityButtonText");
    // Retrieving 'hallSeatLayoutSection' element
    let hallSeatLayoutSection = document.getElementById("hallSeatLayoutSection");

    // When 'addNewHallFormCustomizationSection' is hidden
    if (customizationSectionId.style.display === "none") {
      customizationSectionId.style.display = "block";
      visibilityButtonText.innerText = "HIDE CUSTOMIZATION";
      hallSeatLayoutSection.style.height = "40.3vh";
    } 
    else { // When 'addNewHallFormCustomizationSection' is shown
      customizationSectionId.style.display = "none";
      visibilityButtonText.innerText = "SHOW CUSTOMIZATION";
      hallSeatLayoutSection.style.height = "61.7vh";
    }
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
  


  // Confirm Box Implementation - Edit cinema hall
  async confirmBoxEditHall (title: string, content: string, editHallFormData) {
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
            this.doEditCinemaHall(editHallFormData);
          }
        }
      ]
    });
    await alert.present();
  }



  // Function -  Updated Cinema Hall Alert Box Implementation
  async updatedCinemaHallAlertBox (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.closeEditHallModal();
        }
      }]
    });
    await alert.present();
  }
  


  // Function - Implementation to update cinema hall details by sending the updated details to the server-side
  doEditCinemaHall(editHallForm){

    // Assign user enter hall name into the current cinema hall array
    this.activeSeatLayout.cinemaHallName = editHallForm.hallName;

    // Updating cinema hall details, 'cinemahalls' collection
    this.managerService.updateCinemaHallDetails(this.activeSeatLayout)
      .subscribe((cinemaHallResponse: any) => {

      if(cinemaHallResponse.message == "Cinema hall updated"){
        
        // Showing success message box to the user
        this.updatedCinemaHallAlertBox("Cinema Hall updated", "Cinema hall was successfully updated.");

        console.log("Showing Cinema Hall Updated.");
        
      }
      else if(cinemaHallResponse.message == "Unable to update cinema hall"){
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to edit cinema hall, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to edit cinema hall");
      }

    }, (error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to edit cinema hall, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to edit cinema hall, ", error);
    });

  }
  
  
}
