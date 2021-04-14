import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddNewShowingModalPage } from '../add-new-showing-modal/add-new-showing-modal.page';

@Component({
  selector: 'app-view-showing-modal',
  templateUrl: './view-showing-modal.page.html',
  styleUrls: ['./view-showing-modal.page.scss'],
})
export class ViewShowingModalPage implements OnInit {


  // Declaration | Initialization - string variable to store passingMovieObjectId
  passedMovieObjectId = null;

  // Declaration | Initialization - array to store list of movie showing
  listOfMovieShowing = new Array();

  // Declaration | Initialization - array to store list of cinema locations
  listOfCinemaLocations = new Array();

  // Declaration | Initialization - array to store list of cinema halls
  listOfCinemaHalls = new Array();

  // Declaration | Initialization - array to store list of dates
  listOfSlotDates = new Array();

  // Declaration | Initialization - array to store list of slots
  listOfSlotTimes = new Array();

  // Declaration - Stores the initially loaded and user selected movie object Id
  activeMovieObjectId;

  // Declaration - Stores the initially loaded and user selected cinema location object Id
  activeCinemaLocationObjectId;

  // Declaration - Stores the initially loaded and user selected cinema hall object Id
  activeCinemaHallObjectId;

  // Declaration - Stores the initially loaded and user selected slot object Id
  activeSlotObjectId;

  // Declaration - Stores the initially loaded and user selected showing date
  activeShowingDate;

  // Declaration - Stores the initially loaded and user selected showing time
  activeShowingTime;


  constructor(
    private modalController: ModalController,
    private managerService: ManagerService,
    private alertController: AlertController,
    private navParams: NavParams
  ) { }


  ngOnInit() {

    // Assigning variable with 'passingMovieObjectId'
    this.passedMovieObjectId = this.navParams.get('passingMovieObjectId');

    // Generating initial data set upon page render
    this.generatingMovieShowings();

  }


  // Function - Implementation to close 'View Showing' modal
  async closeViewShowingModal(){
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


  // Function - Implementation for opening the 'Add New Showing' modal
  async openAddNewShowingModal(){
    this.closeViewShowingModal();
    const addNewShowingModal = await this.modalController.create({
      component: AddNewShowingModalPage,
      cssClass: 'add-new-showing-modal',
      componentProps: {
        passingMovieObjectId: this.passedMovieObjectId,
        passingMovieImdbId: '',
        passingMovieCondition: "Movie-Exists",
        passingModalOpenPath: "View-Showing-Modal-Page"
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addNewShowingModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await addNewShowingModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Re-initializing 'listOfMovieShowing' array
        this.listOfMovieShowing = new Array();

        // Retrieving updated data set
        this.generatingMovieShowings();
      }
    }
  }


  // Function - Retrieving movie showings and generating the list of cinema locations
  async generatingMovieShowings(){
    await this.retrieveMovieShowings().then((showingDetails) => {
      this.listOfMovieShowing = showingDetails;
      this.generateListOfCinemaLocations();
    });
  }


  // Function - Defining 'activeCinemaLocationObjectId' variable and preparing list of cinema halls
  setActiveCinemaLocationObjectId(cinemaLocationObjectId: string){
    this.activeCinemaLocationObjectId = cinemaLocationObjectId;
    this.listOfCinemaHalls = new Array();
    this.generateListOfCinemaHalls();
  }


  // Function - Defining 'activeCinemaHallObjectId' variable and preparing list of slot dates
  setActiveCinemaHallObjectId(cinemaHallObjectId: string){
    this.activeCinemaHallObjectId = cinemaHallObjectId;
    this.listOfSlotDates = new Array();
    this.generateListOfSlotDates();
  }


  // Function - Defining 'activeShowingDate' variable and preparing list of slot times
  setActiveShowingDate(showingDate: string){
    this.activeShowingDate = showingDate;
    this.listOfSlotTimes = new Array();
    this.generateListOfSlotTimes();
  }


  // Function - Defining 'activeShowingTime' variable and preparing cinema hall seating grid
  setActiveShowingTime(showingTime: string){
    this.activeShowingTime = showingTime;

  }


  // Function - Preparing list of cinema locations
  generateListOfCinemaLocations() {

    // Declaration | Initialization - To store cinema location details
    let cinemaLocationObject = {
      cinemaLocationObjectId: null,
      cinemaLocationName: null
    }

    // For loop - Iterating through the list of movie showings
    for (let showingCollectionIndex = 0; showingCollectionIndex < this.listOfMovieShowing.length; showingCollectionIndex++) {
      
      // Pushing initial element into 'listOfCinemaLocations' array
      if(showingCollectionIndex == 0){
        cinemaLocationObject = {
          cinemaLocationObjectId: this.listOfMovieShowing[showingCollectionIndex].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName: this.listOfMovieShowing[showingCollectionIndex].cinemaLocation.cinemaLocationName
        }
        this.listOfCinemaLocations.push(cinemaLocationObject);
      }

      // For loop - Iterating through the list of cinema locations
      for (let index = 0; index < this.listOfCinemaLocations.length; index++) {
        
        // Checking for unique value and pushing them into the 'listOfCinemaLocations' array
        if(this.listOfCinemaLocations[index].cinemaLocationObjectId != this.listOfMovieShowing[showingCollectionIndex].cinemaLocation.cinemaLocationObjectId){
          cinemaLocationObject = {
            cinemaLocationObjectId: this.listOfMovieShowing[showingCollectionIndex].cinemaLocation.cinemaLocationObjectId,
            cinemaLocationName: this.listOfMovieShowing[showingCollectionIndex].cinemaLocation.cinemaLocationName
          };
          this.listOfCinemaLocations.push(cinemaLocationObject);
        }
        
      }

    }

  }


  // Function - Preparing lost of cinema halls
  async generateListOfCinemaHalls(){
    // For loop - Iterating through the list of movie showings
    for (let showingObjectIndex = 0; showingObjectIndex < this.listOfMovieShowing.length; showingObjectIndex++) {

      // Checking for unique value and pushing them into the 'listOfCinemaHalls' array
      if(this.listOfMovieShowing[showingObjectIndex].cinemaLocation.cinemaLocationObjectId == this.activeCinemaLocationObjectId){
        // Retrieving cinema hall details from the database
        await this.retrieveCinemaHallDetails(this.listOfMovieShowing[showingObjectIndex].cinemaHallObjectId).then((hallDetails) => {
          this.listOfCinemaHalls.push(hallDetails);
        });
      }
    }
  }


  // Function - Preparing list of slot dates (showing dates)
  generateListOfSlotDates(){

    // Declaration | Initialization - To store slot date details
    let showingSlotDate = {
      showingSlotObjectId: null,
      showingDate: null
    }

    // For loop - Iterating through the list of movie showings
    for (let showingCollectionIndex = 0; showingCollectionIndex < this.listOfMovieShowing.length; showingCollectionIndex++) {

      // Pushing initial element into 'listOfSlotDates' array
      if(showingCollectionIndex == 0){
        showingSlotDate = {
          showingSlotObjectId: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingCollectionIndex]._id,
          showingDate: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingCollectionIndex].showingDate
        }
        this.listOfSlotDates.push(showingSlotDate);
      }

      // For loop - Iterating through the 'listOfSlotDates' array
      for (let slotDateObjectIndex = 0; slotDateObjectIndex < this.listOfSlotDates.length; slotDateObjectIndex++) {

        if(this.listOfSlotDates[slotDateObjectIndex].showingSlotObjectId != this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotDateObjectIndex]._id) {
          showingSlotDate = {
            showingSlotObjectId: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotDateObjectIndex]._id,
            showingDate: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotDateObjectIndex].showingDate
          }
          this.listOfSlotDates.push(showingSlotDate);
          break;
        }
      }

    }
  }


  // Function - Preparing list of slot times (showing times)
  generateListOfSlotTimes(){

    // Declaration | Initialization - To store slot time details
    let showingSlotTime = {
      showingSlotObjectId: null,
      slotDate: null,
      slotStartTime: null,
      slotEndTime: null
    }

    let listOfSlotTimingsTemp = new Array();
    
    // For loop - Iterating through the list of movie showings
    for (let showingCollectionIndex = 0; showingCollectionIndex < this.listOfMovieShowing.length; showingCollectionIndex++) {

      for (let showingSlotObjectIndex = 0; showingSlotObjectIndex < this.listOfMovieShowing[showingCollectionIndex].showingSlots.length; showingSlotObjectIndex++) {

        if(showingCollectionIndex == 0){
          showingSlotTime = {
            showingSlotObjectId: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingSlotObjectIndex]._id,
            slotDate: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingSlotObjectIndex].showingDate,
            slotStartTime: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingSlotObjectIndex].timeSlotStartTime,
            slotEndTime: this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingSlotObjectIndex].timeSlotEndTime
          }
          listOfSlotTimingsTemp.push(showingSlotTime);
        }

        for (let slotListObjectIndex = 0; slotListObjectIndex < this.listOfSlotTimes.length; slotListObjectIndex++) {
          if(this.listOfSlotTimes[slotListObjectIndex].showingSlotObjectId != this.listOfMovieShowing[showingCollectionIndex].showingSlots[showingSlotObjectIndex]._id){
            
            showingSlotTime = {
              showingSlotObjectId: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotListObjectIndex]._id,
              slotDate: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotListObjectIndex].showingDate,
              slotStartTime: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotListObjectIndex].timeSlotStartTime,
              slotEndTime: this.listOfMovieShowing[showingCollectionIndex].showingSlots[slotListObjectIndex].timeSlotEndTime
            }
            listOfSlotTimingsTemp.push(showingSlotTime);

            break;
          }
        }
      }
    }

    for (let index = 0; index < listOfSlotTimingsTemp.length; index++) {
      if(listOfSlotTimingsTemp[index].slotDate == this.activeShowingDate.showingDate){
        this.listOfSlotTimes.push(listOfSlotTimingsTemp[index]);
      }
    }

  }
  

  // Function - Retrieving all showing movies for movieObjectId from the database
  retrieveMovieShowings(): Promise<any>{

    return new Promise((resolve,reject)=>{
      // Retrieving showing movies
      this.managerService.retrieveShowingMovieByMovieObjectId(this.passedMovieObjectId)
      .subscribe((showingMovieResponse: any) => {

        if(showingMovieResponse.message == "Showing movie retrieved"){

          // Returning returned data as a resolved promise
          resolve(showingMovieResponse.returnedData);

        }
        else{
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to retrieve showing movies, apologies for the inconvenience. Please contact administrator.");

          console.log("Unable to retrieve showing movies");

          resolve(false);
        }

      }, (error: ErrorEvent) => {

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve showing movies, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve showing movies: ", error);

        resolve(false);
      });
    });

  }


  // Function - Retrieving cinema hall details from the database
  retrieveCinemaHallDetails(cinemaHallObjectId: string): Promise<any>{

    let cinemaHall = {
      cinemaHallObjectId: null,
      cinemaHallName: null,
      seatingGridNoOfColumns: null,
      seatingGridNoOfRows: null
    };

    return new Promise((resolve,reject)=>{
      // Retrieving showing movies
      this.managerService.retrieveCinemaHallById(cinemaHallObjectId)
      .subscribe((cinemaHallResponse: any) => {

        if (cinemaHallResponse.message == "Cinema hall retrieved") {

          // Initializing 'cinemaHall' object with retrieved cinema hall details
          cinemaHall = {
            cinemaHallObjectId: cinemaHallResponse.returnedData._id,
            cinemaHallName: cinemaHallResponse.returnedData.cinemaHallName,
            seatingGridNoOfColumns: cinemaHallResponse.returnedData.seatingGridNoOfColumns,
            seatingGridNoOfRows: cinemaHallResponse.returnedData.seatingGridNoOfRows
          };

          // Returning returned data as a resolved promise
          resolve(cinemaHall);

        }
        else {
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to retrieve cinema hall, apologies for the inconvenience. Please contact administrator.");

          console.log("Unable to retrieve cinema halls");

          resolve(false);

        }

      }, (error: ErrorEvent) => {

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve cinema hall, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve cinema hall: ", error);

        resolve(false);

      });
    });
  }


}
