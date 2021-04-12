import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { MovieDetails } from 'src/app/models/account/manager/movie-details';
import { ShowingCinemaHallList, ShowingSeatDetails } from 'src/app/models/account/manager/showing-cinema-hall';
import { ShowingMovie } from 'src/app/models/account/manager/showing-movie';
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

  // Declaration - stores the existing movie object id or the newly created object id
  activeMovieObjectId;

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

  // Declaration | Initialization - string variable to store passingMovieObjectId
  passedMovieObjectId = null;

  // Declaration | Initialization - string variable to store passingMovieImdbId
  passedMovieImdbId = null;

  // Declaration | Initialization - string variable to store passingMovieCondition
  passedMovieCondition = null;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerAddNewShowing' block
  loadingSpinnerAddNewShowing: Boolean = false;

  // Declaration | Initialization - Stores status of adding new showing details
  addNewShowingStatus: Boolean = false;


  /**
   * To store selected values for showing details
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
    private alertController: AlertController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    // ANGULAR MATERIAL - DATEPICKER | Retrieving current date and setting as min data
    this.minDate = new Date();

    // ANGULAR MATERIAL - DATEPICKER | Retrieving the current year
    const currentYear = new Date().getFullYear();
    // ANGULAR MATERIAL - DATEPICKER | Setting the max date to december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);


    // Assigning variable with 'passingMovieObjectId'
    this.passedMovieObjectId = this.navParams.get('passingMovieObjectId');

    // Assigning variable with 'passingMovieImdbId'
    this.passedMovieImdbId = this.navParams.get('passingMovieImdbId');
    
    // Assigning variable with 'passingMovieCondition'
    this.passedMovieCondition = this.navParams.get('passingMovieCondition');


    // Retrieving list of cinema locations upon page load
    this.retrieveCinemaLocations();

    // Retrieving list of showing experiences upon page load
    this.retrieveShowingExperiences();

    // Assigning form validation to AddNewShowingForm
    this.addNewShowingForm = this.formBuilder.group({
      cinemaLocationName: new FormControl('', Validators.required),
      showingStartDate: new FormControl('', Validators.required),
      showingEndDate: new FormControl('', Validators.required),
      showingExperience: new FormControl('', Validators.required),
      slotStartTime: new FormControl('', Validators.required),
      slotEndTime: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Add New Showing' modal
  async closeAddNewShowingModal(){
    await this.modalController.dismiss(this.addNewShowingStatus);
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
        this.alertNotice("Value missing", "Enter children ticket cost");
      }
      else if(String(this.adultTicketCost.toString()) == ""){
        // Showing missing message box to the user
        this.alertNotice("Value missing", "Enter adults ticket cost");
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
      // Removing one index value from the array
      this.listOfShowingDetails.splice(arrayIndex, 1);
    }
    
  }

  // Checking the condition of the movie (new or exists), and assigning the relevant path
  addNewShowingDetailsPre(newShowingDetailsFormDetails){

    // Checking whether ant showing slots are assigned and the showing detail form is filled
    if(this.listOfShowingDetails.length != 0 || newShowingDetailsFormDetails != null){

      // Checking the condition of the movie ('New-Movie' or 'Movie-Exists'), and assigning the relevant path
      // to either assign the existing movieObjectId if the movie exists, or add the movie and assign the new movieObjectId

      // If the movie exists, the passed movie object id is assigned
      if(this.passedMovieCondition == "Movie-Exists"){

        // Assigning 'activeMovieObjectId' with the existing movie object document ID
        this.activeMovieObjectId = this.passedMovieObjectId

        // Continuing 'Add New Showing' functionality after the 'activeMovieObjectId' is assigned
        this.addNewShowingDetails(newShowingDetailsFormDetails);

      }
      // If the movie is new, it will be added to the database and the object id will be retrieved
      else if(this.passedMovieCondition == "New-Movie"){

        // Adding new movie into the database
        // Retrieving the movie details from the omdb api
        this.managerService.getMovieDetailsForOneMovie(this.passedMovieImdbId)
        .subscribe((retrievedMovieDetails: MovieDetails) => {

          if(retrievedMovieDetails.Response === "True"){
            
            // Adding movie to the database under 'upcoming'
            this.managerService.addMovie(retrievedMovieDetails, "NowShowing")
              .subscribe((retrievedMovieResponse: any) => {

                if(retrievedMovieResponse.message === "Movie Added As NowShowing"){
                  
                  // Assigning 'activeMovieObjectId' with the newly create movie object document ID
                  this.activeMovieObjectId = retrievedMovieResponse.returnedData._id

                  // Continuing 'Add New Showing' functionality after the 'activeMovieObjectId' is assigned
                  this.addNewShowingDetails(newShowingDetailsFormDetails);

                }
                else{
                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to add movie as 'NowShowing', apologies for the inconvenience. Please contact administrator.");

                  console.log("Unable to add movie as 'NowShowing'");
                }

              }, (error: ErrorEvent) => {
                // Showing error message box to the user
                this.alertNotice("ERROR", "Unable to add movie as 'NowShowing', apologies for the inconvenience. Please contact administrator.");

                console.log("Unable to add movie as 'NowShowing' ", error);
              }
            );

          }
          else{
            // Showing error message box to the user
            this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

            console.log("Unable to retrieve movie details");
          }

        },
        (error: ErrorEvent) => {
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to retrieve movie details, apologies for the inconvenience. Please contact administrator.");

          console.log("Unable to retrieve results: ", error);
        });

      }

    }

  }

  // Adding new showing details
  addNewShowingDetails(newShowingDetailsFormDetails){

    // Checking whether ant showing slots are assigned and the showing detail form is filled
    if(this.listOfShowingDetails.length != 0 || newShowingDetailsFormDetails != null){
      
      // Assigning 'loadingSpinnerAddNewShowing' to true (starts loading spinner)
      this.loadingSpinnerAddNewShowing = true;

      // Assigning 'addNewShowingStatus' to false
      this.addNewShowingStatus = false;

    
      // Preparing details to add new showing details

      // To store selected cinema location details
      let selectedCinemaLocation = {
        cinemaLocationObjectId: null,
        cinemaLocationName: null,
        cinemaLocationAddress: {
          streetAddress: null,
          city: null,
          postalCode: null
        }
      };

      // For Loop | Retrieving cinema locations details from the already retrieved list of cinema locations using the
      // user selected cinemaLocationObjectId
      for (let cinemaLocationIndex = 0; cinemaLocationIndex < this.cinemaLocationList.length; cinemaLocationIndex++) {
        if(this.cinemaLocationList[cinemaLocationIndex]._id == newShowingDetailsFormDetails.cinemaLocationName){
          selectedCinemaLocation.cinemaLocationObjectId = this.cinemaLocationList[cinemaLocationIndex]._id;
          selectedCinemaLocation.cinemaLocationName = this.cinemaLocationList[cinemaLocationIndex].cinemaLocationName;
          selectedCinemaLocation.cinemaLocationAddress = this.cinemaLocationList[cinemaLocationIndex].cinemaLocationAddress;
        }
      }

      // Extracting the month, day and year from selected showing start date, sample format - Mar 16, 2021
      let showingStartDateString = (new Date(newShowingDetailsFormDetails.showingStartDate).toLocaleString('default', { month: 'short' })) + " " + 
                                    (new Date(newShowingDetailsFormDetails.showingStartDate).toLocaleString('default', { day: '2-digit' })) + ", " + 
                                    (new Date(newShowingDetailsFormDetails.showingStartDate).toLocaleString('default', { year: 'numeric' }));

      // Extracting the month, day and year from selected showing end date, sample format - Mar 16, 2021
      let showingEndDateString = (new Date(newShowingDetailsFormDetails.showingEndDate).toLocaleString('default', { month: 'short' })) + " " + 
                                  (new Date(newShowingDetailsFormDetails.showingEndDate).toLocaleString('default', { day: '2-digit' })) + ", " + 
                                  (new Date(newShowingDetailsFormDetails.showingEndDate).toLocaleString('default', { year: 'numeric' }));

      // Declaration - To objects store showing slot details
      let newShowingSlotDetails = {
        showingExperience: null,
        showingDate: null,
        timeSlotStartTime: null,
        timeSlotEndTime: null,
        adultsTicketFeeLKR: null,
        childrenTicketFeeLKR: null
      }

      // Calculating the number of days in the showing period
      let showingStartDateDate: Date = new Date(newShowingDetailsFormDetails.showingStartDate);
      let showingEndDateDate: Date = new Date(newShowingDetailsFormDetails.showingEndDate);
      // Calculated date is converted to days from milliseconds
      let noOfShowingPeriodDay = (showingEndDateDate.getTime() - showingStartDateDate.getTime()) / (1000 * 60 * 60 * 24); 

      // Declaration | Initialization - To store the number of movie showing slots
      let noOfShowingSlot = this.listOfShowingDetails.length;

      // Declaration - To store an array of objects of showing slot details
      let newShowingSlotsArray = new Array();

      // Declaration - To store current showing slot's date
      let currentShowingDate;


      // For loop - Generating array of showing slot objects
      // Iterating through the number of days in the showing period
      for (let showingDayIndex = 0; showingDayIndex < noOfShowingPeriodDay; showingDayIndex++) {
        
        // Checking whether the 'showingDayIndex' is 0, which doesn't require the date to be incremented
        if(showingDayIndex != 0){
          // Increment showing start date by one for 'showingDate' field
          showingStartDateDate.setDate(showingStartDateDate.getDate() + 1);

          // Extracting the month, day and year from 'showingStartDateDate', sample format - Mar 16, 2021
          currentShowingDate = (new Date(showingStartDateDate).toLocaleString('default', { month: 'short' })) + " " + 
                                  (new Date(showingStartDateDate).toLocaleString('default', { day: '2-digit' })) + ", " + 
                                  (new Date(showingStartDateDate).toLocaleString('default', { year: 'numeric' }));
        }

        // For loop - Iterating through the number of showing slots in each day
        for (let showingSlotIndex = 0; showingSlotIndex < noOfShowingSlot; showingSlotIndex++) {
          newShowingSlotDetails = {
            showingExperience: this.listOfShowingDetails[showingSlotIndex].showingExperience,
            showingDate: null,
            timeSlotStartTime: this.listOfShowingDetails[showingSlotIndex].timeSlotStartTime,
            timeSlotEndTime: this.listOfShowingDetails[showingSlotIndex].timeSlotEndTime,
            adultsTicketFeeLKR: this.listOfShowingDetails[showingSlotIndex].adultTicketCost,
            childrenTicketFeeLKR: this.listOfShowingDetails[showingSlotIndex].childTicketCost
          }

          // Checking whether the 'showingDayIndex' is 0 to add the 'showingDate' field
          showingDayIndex == 0 ? (newShowingSlotDetails.showingDate = showingStartDateString) : (newShowingSlotDetails.showingDate = currentShowingDate);

          // Pushing 'newShowingSlotDetails' object instance into the 'newShowingSlotsArray' array
          newShowingSlotsArray.push(newShowingSlotDetails);
        }

      }
      
      // Preparing 'selectedShowingMovieDetails' to add new showing details to the database
      let selectedShowingMovieDetails: ShowingMovie = {
        movieObjectId: this.activeMovieObjectId,
        cinemaHallObjectId: this.activeCinemaHallObjectId,
        cinemaLocation: {
          cinemaLocationObjectId: selectedCinemaLocation.cinemaLocationObjectId,
          cinemaLocationName: selectedCinemaLocation.cinemaLocationName,
          cinemaLocationAddress: {
            streetAddress: selectedCinemaLocation.cinemaLocationAddress.streetAddress,
            city: selectedCinemaLocation.cinemaLocationAddress.city,
            postalCode: selectedCinemaLocation.cinemaLocationAddress.postalCode
          }
        },
        showingStartDate: showingStartDateString,
        showingEndDate: showingEndDateString,
        showingSlots: newShowingSlotsArray
      }

      // Passing 'selectedShowingMovieDetails' to the backend to add to the database
      this.managerService.addNewShowingMovie(selectedShowingMovieDetails)
        .subscribe((showingMovieDetailsResponse: any) => {

          if(showingMovieDetailsResponse.message == "Showing movie added"){

            
            // Preparing showing cinema hall details

            // For loop - iterating through all cinema halls
            for (let cinemaHallIndex = 0; cinemaHallIndex < this.cinemaHallList.length; cinemaHallIndex++) {

              // If condition - checking whether the currently active cinema hall object Id is equal when iterating through the loop
              if(this.activeCinemaHallObjectId == this.cinemaHallList[cinemaHallIndex]._id){

                // Declaration | Initialization - To store the showing seat details for the cinema halls
                let showingSeatingDetails = {
                  seatId: null,
                  seatActive: null,
                  seatNumber: null,
                  seatUnavailable: null,
                  seatStatus: null,
                  customerObjectId: null
                };

                // Declaration | Initialization - To store the showing cinema hall details
                let showingCinemaHall = {
                  slotObjectId: null,
                  showingMovieObjectId: null,
                  cinemaHallObjectId: null,
                  cinemaLocationObjectId: null,
                  showingSeatDetails: null
                };

                // Declaration | Initialization - To store the number of all showing slots available
                let noOfAllShowingSlots = showingMovieDetailsResponse.returnedData.showingSlots.length;

                // Declaration | Initialization - To store the number of cinema hall seats
                let noOfCinemaHallSeats = this.cinemaHallList[cinemaHallIndex].seatingDetails.length;

                // Declaration - To store an array of objects on cinema hall showing seat details
                let showingSeatDetailsArray = new Array();

                // Declaration - To store an array of objects on cinema hall details
                let showingCinemaHallArray = new Array();

                // For loop - Iterating through the showing slots to assign the cinema halls
                for (let showingSlotIndex = 0; showingSlotIndex < noOfAllShowingSlots; showingSlotIndex++) {

                  // For loop - Iterating through the cinema hall seats
                  for (let cinemaHallSeatIndex = 0; cinemaHallSeatIndex < noOfCinemaHallSeats; cinemaHallSeatIndex++) {

                    // Assigning cinema hall seat details into the 'showingSeatingDetails' object
                    showingSeatingDetails = {
                      seatId: this.cinemaHallList[cinemaHallIndex].seatingDetails[cinemaHallSeatIndex].seatId,
                      seatActive: this.cinemaHallList[cinemaHallIndex].seatingDetails[cinemaHallSeatIndex].seatActive,
                      seatNumber: this.cinemaHallList[cinemaHallIndex].seatingDetails[cinemaHallSeatIndex].seatNumber,
                      seatUnavailable: this.cinemaHallList[cinemaHallIndex].seatingDetails[cinemaHallSeatIndex].seatUnavailable,
                      seatStatus: "null",
                      customerObjectId: "null"
                    }

                    // Adding 'showingSeatingDetails' object into the 'showingSeatDetailsArray' array
                    showingSeatDetailsArray.push(showingSeatingDetails);
                    
                  }

                  // Assigning cinema hall details into the 'showingCinemaHall' object
                  showingCinemaHall = {
                    slotObjectId: showingMovieDetailsResponse.returnedData.showingSlots[showingSlotIndex]._id,
                    showingMovieObjectId: showingMovieDetailsResponse.returnedData._id,
                    cinemaHallObjectId: this.activeCinemaHallObjectId,
                    cinemaLocationObjectId: newShowingDetailsFormDetails.cinemaLocationName,
                    showingSeatDetails: showingSeatDetailsArray
                  }

                  // Adding 'showingCinemaHall' object into the 'showingCinemaHallArray' array
                  showingCinemaHallArray.push(showingCinemaHall);

                  // Re-initializing 'showingSeatDetailsArray' array to store showing seat details for the next showing cinema hall document
                  showingSeatDetailsArray = new Array();

                }
                
                // Passing 'showingCinemaHallArray' array to the backend to add the list of cinema halls to the database
                this.managerService.assignShowingCinemaHalls(showingCinemaHallArray)
                .subscribe((showingCinemaHallResponse: any) => {

                  if(showingCinemaHallResponse.message == "Showing cinema hall(s) assigned"){
                    

                    // Updating movie status to Now Showing
                    this.managerService.updateMovieStatus(this.passedMovieImdbId, "NowShowing")
                      .subscribe((updatedMovieDetails: any) => {
                
                      if(updatedMovieDetails.message !== "Movie status updated"){
                        // Showing error message box to the user
                        this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

                        console.log("Unable to update movie status");
                      }
                      else{
                        // Assigning 'loadingSpinnerAddNewShowing' to false (stops loading spinner)
                        this.loadingSpinnerAddNewShowing = false;

                        // Assigning 'addNewShowingStatus' to true
                        this.addNewShowingStatus = true;

                        // Showing success message box to the user
                        this.alertNotice("New Showing Added", "New showing details were successfully added.");

                        console.log("Movie was moved to movie catalog (Now Showing)");

                        // Closing 'Add New Showing' modal
                        this.closeAddNewShowingModal();
                      }

                    },
                    (error: ErrorEvent) => {
                      // Showing error message box to the user
                      this.alertNotice("ERROR", "Unable to update movie status, apologies for the inconvenience. Please contact administrator.");

                      console.log("Unable to update movie status: ", error);
                    });
                    

                  }
                  else{
                    // Assigning 'loadingSpinnerAddNewShowing' to false (stops loading spinner)
                    this.loadingSpinnerAddNewShowing = false;

                    // Assigning 'addNewShowingStatus' to false
                    this.addNewShowingStatus = false;

                    // Showing error message box to the user
                    this.alertNotice("ERROR", "Unable to assign cinema halls, apologies for the inconvenience. Please contact administrator.");

                    console.log("Unable to assign cinema halls");
                  }

                },(error: ErrorEvent) => {
                  // Assigning 'loadingSpinnerAddNewShowing' to false (stops loading spinner)
                  this.loadingSpinnerAddNewShowing = false;

                  // Assigning 'addNewShowingStatus' to false
                  this.addNewShowingStatus = false;

                  // Showing error message box to the user
                  this.alertNotice("ERROR", "Unable to assign cinema halls, apologies for the inconvenience. Please contact administrator.");

                  console.log("Unable to assign cinema halls: ", error);
                });
              }
            }
            
          }
          else{
            // Assigning 'loadingSpinnerAddNewShowing' to false (stops loading spinner)
            this.loadingSpinnerAddNewShowing = false;

            // Assigning 'addNewShowingStatus' to false
            this.addNewShowingStatus = false;

            // Showing error message box to the user
            this.alertNotice("ERROR", "Unable to add new showing movie details, apologies for the inconvenience. Please contact administrator.");

            console.log("Unable to add new showing movie details");
          }

      },(error: ErrorEvent) => {
        // Assigning 'loadingSpinnerAddNewShowing' to false (stops loading spinner)
        this.loadingSpinnerAddNewShowing = false;

        // Assigning 'addNewShowingStatus' to false
        this.addNewShowingStatus = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to add new showing movie details, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to add new showing movie details: ", error);
      });

    }
    else if(this.listOfShowingDetails.length){
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
