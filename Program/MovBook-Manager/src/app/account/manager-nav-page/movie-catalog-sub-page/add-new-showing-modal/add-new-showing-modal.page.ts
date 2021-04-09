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

  // Declaration - stores list of cinema experiences
  showingExperienceList = new Array();

  // Declaration | Initialization - to handle visibility of 'cinemaLocationSelectionInitialText' block
  cinemaLocationSelectionInitialText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'cinemaHallSelectionInitialText' block
  cinemaHallSelectionInitialText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'showingDetailsInitialText' block
  showingDetailsInitialText: Boolean = true;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerCinemaLocation' block
  loadingSpinnerCinemaLocation: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerShowingExperience' block
  loadingSpinnerShowingExperience: Boolean = false;

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

  // Declaration | Initialization - storing status to check the whether the showing details are provided
  showingDetailsEntered: Boolean = false;

  // Declaration - stores the list of showing sessions
  listOfShowingDetails = new Array();

  /**
   * Maintaining selected values for showing details
   * - Time Slot Start Time
   * - Time Slot End Time
   * - Showing Experience
   * - Child Ticket Cost
   * - Adult Ticket Cost
   */
  private timeSlotStartTime: String;
  private timeSlotEndTime: String;
  private showingExperience: String;
  private childTicketCost: Number;
  private adultTicketCost: Number;


  // ANGULAR MATERIAL - DATEPICKER | Setting min validation for angular material datepicker
  minDate: Date;

  // ANGULAR MATERIAL - DATEPICKER | Setting max validation for angular material datepicker
  maxDate: Date;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // ANGULAR MATERIAL - DATEPICKER | Retrieving current date and setting as min data
    this.minDate = new Date();

    // ANGULAR MATERIAL - DATEPICKER | Retrieving the current year
    const currentYear = new Date().getFullYear();
    // ANGULAR MATERIAL - DATEPICKER | Setting the max date to december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);


    // Retrieving list of cinema locations upon page load
    this.retrieveCinemaLocations();

    // Retrieving list of showing experiences upon page load
    this.retrieveShowingExperiences();

    // Assigning form validation to AddNewShowingForm
    this.addNewShowingForm = this.formBuilder.group({
      cinemaLocationName: new FormControl('', Validators.required),
      showStartDate: new FormControl('', Validators.required),
      showEndDate: new FormControl('', Validators.required),
      showingExperience: new FormControl('', Validators.required),
      slotStartTime: new FormControl('', Validators.required),
      slotEndTime: new FormControl('', Validators.required)
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


  // Getters and setters to assign and pass showing details
  public getTimeSlotStartTime(): String {
    return this.timeSlotStartTime;
  }
  public setTimeSlotStartTime(value: String) {
    this.timeSlotStartTime = value;
    this.enableAssignSlotDetailsButton();
  }

  public getTimeSlotEndTime(): String {
    return this.timeSlotEndTime;
  }
  public setTimeSlotEndTime(value: String) {
    this.timeSlotEndTime = value;
    this.enableAssignSlotDetailsButton();
  }

  public getShowingExperience(): String {
    return this.showingExperience;
  }
  public setShowingExperience(value: String) {
    this.showingExperience = value;
    this.enableAssignSlotDetailsButton();
  }

  public getChildTicketCost(): Number {
    return this.childTicketCost;
  }
  public setChildTicketCost(value: Number) {
    this.childTicketCost = value;
    this.enableAssignSlotDetailsButton();
  }

  public getAdultTicketCost(): Number {
    return this.adultTicketCost;
  }
  public setAdultTicketCost(value: Number) {
    this.adultTicketCost = value;
    this.enableAssignSlotDetailsButton();
  }


  // Function - Enabling 'Assign Slot Details' buttons if all the necessary details are provided
  enableAssignSlotDetailsButton(){

    // Checking whether all the necessary details for showing details are assigned
    if((this.timeSlotStartTime != undefined || this.timeSlotStartTime != null) &&
      (this.timeSlotEndTime != undefined || this.timeSlotEndTime != null) &&
      (this.showingExperience != undefined || this.showingExperience != null) &&
      (this.childTicketCost != undefined || this.childTicketCost != null) &&
      (this.adultTicketCost != undefined || this.adultTicketCost != null)){

        // Enabling 'Assign Slot Details' button
        this.showingDetailsEntered = true;
       
      }
    else{

      // Disable 'Assign Slot Details' button
      this.showingDetailsEntered = false;

    }


    if(this.timeSlotStartTime == ""){
      console.log("3333");
    }

  }

  // Function - Assign new showing shot
  assignNewSlot(){

    if((this.timeSlotStartTime != undefined || this.timeSlotStartTime != null) &&
      (this.timeSlotEndTime != undefined || this.timeSlotEndTime != null) &&
      (this.showingExperience != undefined || this.showingExperience != null) &&
      (this.childTicketCost != undefined || this.childTicketCost != null) &&
      (this.adultTicketCost != undefined || this.adultTicketCost != null)){
      
      if(String(this.childTicketCost) == ""){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Enter child ticket cost");
      }
      else if(String(this.adultTicketCost.toString()) == ""){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Enter adult ticket cost");
      }
      else{
         // Hiding 'showingDetailsInitialText' block
        this.showingDetailsInitialText = false;

        let showingDetailSession = {
          timeSlotStartTime: this.timeSlotStartTime,
          timeSlotEndTime: this.timeSlotEndTime,
          showingExperience: this.showingExperience,
          childTicketCost: this.childTicketCost,
          adultTicketCost: this.adultTicketCost
        }

        this.listOfShowingDetails.push(showingDetailSession);

      }
      
    }
    else{

      if(this.timeSlotStartTime == undefined || this.timeSlotStartTime == null){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Select slot start time");
      }
      else if(this.timeSlotEndTime == undefined || this.timeSlotEndTime == null){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Select slot end time");
      }
      else if(this.showingExperience == undefined || this.showingExperience == null){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Select slot showing experience");
      }

    }

  }

  // Remove showing slot from 'listOfShowingDetails' array
  removeShowingSlot(arrayIndex: number){

    if (arrayIndex !== -1) {
      this.listOfShowingDetails.splice(arrayIndex, 1);
    }
    
  }

  // Adding new showing details
  addNewShowingDetails(showingDetails){

    if(this.listOfShowingDetails.length == 0){

      // Showing error message box to the user
      this.alertNotice("No Showing Slots Assigned", "Assign showing slots");

    }

  }

  // Function - Retrieving cinema locations from the server-side
  retrieveCinemaLocations(){

    // Activating 'loadingSpinnerCinemaLocation' loading spinner
    this.loadingSpinnerCinemaLocation = true;

    // Retrieving list of cinema locations
    this.managerService.retrieveCinemaLocations()
      .subscribe((cinemaLocationList: any) => {

        if(cinemaLocationList.message == "Cinema locations retrieved"){
          // Assigning retrieved list of cinema locations to 'cinemaLocationList' array
          this.cinemaLocationList = cinemaLocationList.returnedData;

          // Disabling 'loadingSpinnerCinemaLocation' loading spinner
          this.loadingSpinnerCinemaLocation = false;
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

          // Disabling 'loadingSpinnerCinemaHall' loading spinner
          this.loadingSpinnerCinemaHall = false;

          this.loadingSpinnerCinemaHall = false;
        }
        else if(cinemaHallList.message == "No cinema halls available for cinema location"){
          console.log(cinemaHallList.message);

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

  // Function - Retrieving list of showing experiences from the server-side
  retrieveShowingExperiences(){

    // Activating 'loadingSpinnerShowingExperience' loading spinner
    this.loadingSpinnerShowingExperience = true;

    // Retrieving the showing experiences
    this.managerService.retrieveListOfShowingExperiences()
      .subscribe((retrievedShowingExperiences: any) => {

      if(retrievedShowingExperiences.message == "Showing experiences retrieved"){

        // Assigning 'loadingSpinnerShowingExperience' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

        // Assigning retrieve movie list to 'showingExperienceList' array
        this.showingExperienceList = retrievedShowingExperiences.returnedData;

      }
      else if(retrievedShowingExperiences.message == "No showing experiences available"){

        // Assigning 'loadingSpinnerShowingExperience' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

      }
      else{

        // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve showing experience, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve showing experience");

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
      this.loadingSpinnerShowingExperience = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve showing experience, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve showing experience");
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
