import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { HallSeatDetails } from 'src/app/models/account/manager';
import { AssignHallSeatPopoverPage } from '../assign-hall-seat-popover/assign-hall-seat-popover.page';

import { CinemaHallsModalPage } from '../cinema-halls-modal/cinema-halls-modal.page';

@Component({
  selector: 'app-add-hall-modal',
  templateUrl: './add-hall-modal.page.html',
  styleUrls: ['./add-hall-modal.page.scss'],
})
export class AddHallModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewHallForm Form
  addNewHallForm: FormGroup;
  
  // Declaration | Initialization - int to store passedCinemaId
  passedCinemaId = null;

  // Declaration | Initialization - string to store and process hallSeatId
  hallSeatId = null;

  // Declaration | Initialization - boolean to store visibility of initial text
  showInitialText: Boolean = true;

  // Declaration - array to store seat details
  hallSeating: Array<HallSeatDetails> = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'cinemaId'
    // TODO: Pass cinemaId from parent page
    this.passedCinemaId = "0000000010";//this.navParams.get('passingCinemaId');

    // Merging passedCinemaId into hallSeatId
    this.hallSeatId = this.passedCinemaId;

    // Merging hallId into hallSeatId
    this.hallSeatId = this.hallSeatId + "|" + "0001";
  
    this.addNewHallForm = this.formBuilder.group({
      hallName: new FormControl('', Validators.required),
      noOfRows: new FormControl('', Validators.required),
      noOfColumns: new FormControl('', Validators.required),
      numberSeatAlphabetical: new FormControl(false)
    });
  }

  // Implementation to close 'Cinema Halls' modal
  async closeAddHallModal(){
    await this.modalController.dismiss();
    this.openCinemaHallsModal();
  }

  // Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Implementation for opening the 'Cinema Halls' modal
  async openCinemaHallsModal(){
    const cinemaHallsModal = await this.modalController.create({
      component: CinemaHallsModalPage,
      cssClass: 'cinema-halls-modal',
      componentProps: {
        passingCinemaId: this.passedCinemaId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    cinemaHallsModal.present();
  }



  updateHallSeating(seatDetails: HallSeatDetails){

    for (let hallSeat = 0; hallSeat < this.hallSeating.length; hallSeat++) {
      if(this.hallSeating[hallSeat].seatActive !== seatDetails.seatActive || 
        this.hallSeating[hallSeat].seatNumber !== seatDetails.seatNumber || 
        this.hallSeating[hallSeat].seatUnavailable !== seatDetails.seatUnavailable){
      
          let updatedSeatButtonElement = document.getElementById("btn|" + seatDetails.seatId);
          let updatedSeatDivElement = document.getElementById("div|" + seatDetails.seatId);
          let updatedSeatPElement = document.getElementById("p|" + seatDetails.seatId);
          let updatedSeatDivButtonElement = document.getElementById("divBtn|" + seatDetails.seatId);

          if(this.hallSeating[hallSeat].seatActive !== seatDetails.seatActive){
            if(seatDetails.seatActive == true){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#0AAA64";
            }
            else if(seatDetails.seatActive == false){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#7A7E7B";
            }
          }
          else if(this.hallSeating[hallSeat].seatNumber !== seatDetails.seatNumber){
            // CSS Styles - innerHTML text of 'divButton' element
            updatedSeatDivButtonElement.innerHTML = seatDetails.seatNumber;
          }
          else if(this.hallSeating[hallSeat].seatUnavailable !== seatDetails.seatUnavailable){
            if(seatDetails.seatUnavailable == true){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#D33131";
            }
            else if(seatDetails.seatUnavailable == false){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#7A7E7B";
            }
          }
          else if(this.hallSeating[hallSeat].seatActive !== seatDetails.seatActive && 
            this.hallSeating[hallSeat].seatUnavailable !== seatDetails.seatUnavailable){
            if(seatDetails.seatUnavailable == true){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#D33131";
            }
            else if(seatDetails.seatUnavailable == false){
              // CSS Styles - background color of 'divButton' element
              updatedSeatDivButtonElement.style.backgroundColor = "#7A7E7B";
            }
          }

          if(this.hallSeating[hallSeat].seatId === seatDetails.seatId){
            this.hallSeating[hallSeat].seatActive = seatDetails.seatActive;
            this.hallSeating[hallSeat].seatNumber = seatDetails.seatNumber;
            this.hallSeating[hallSeat].seatUnavailable = seatDetails.seatUnavailable;
          }


      }
    }

    console.log(this.hallSeating);

  }



  // Implementation for opening the 'AssignHallSeat' popover
  async openAssignHallSeatPopover(evt: Event, seatId){

    // Calling 'extractStringBlocks()' function to split 'seatId' string to blocks
    let seatIdBlockArr = this.extractStringBlocks(seatId.id);

    // Identifying 'seatId' using existing 'cinemaId', 'hallId', 'row', and 'columnCell'
    let passingSeatId = seatIdBlockArr[1] + "|" + seatIdBlockArr[2] + "|" +  seatIdBlockArr[3] + "|" +  seatIdBlockArr[4];

    let existingSeatActive;
    let existingSeatNumber;
    let existingSeatUnavailable;

    // Retrieving existing data from 'hallSeating' array
    for (let seating = 0; seating < this.hallSeating.length; seating++) {
      console.log(passingSeatId);
      console.log(this.hallSeating[seating].seatId);
      if(passingSeatId == this.hallSeating[seating].seatId){
        existingSeatActive = this.hallSeating[seating].seatActive;
        existingSeatNumber = this.hallSeating[seating].seatNumber;
        existingSeatUnavailable = this.hallSeating[seating].seatUnavailable;
      }
      console.log('33 '+existingSeatNumber);
    }

    // Implementation to open popover
    const assignHallSeatPopover = await this.popoverController.create({
      component: AssignHallSeatPopoverPage,
      componentProps: {
        passingSeatId: passingSeatId,
        passingSeatActive: existingSeatActive,
        passingSeatNumber: existingSeatNumber,
        passingSeatUnavailable: existingSeatUnavailable
      },
      event: evt,
      // Disabling popover closing from any outside clicks
      backdropDismiss: false
    });
    // Executing popover open
    assignHallSeatPopover.present();

    // Collecting response data when popover is dismissed
    const { data } = await assignHallSeatPopover.onDidDismiss();
    console.log(data);
    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // Updating hall seating according to the modifications
      this.updateHallSeating(data);
    }
  }

  // Implementation to hide or show 'Add New Hall' form customization section
  addNewHallCustomizationVisibility(){
    // Retrieving 'addNewHallFormCustomizationSection' element
    let customizationSectionId = document.getElementById("addNewHallFormCustomizationSection");
    // Retrieving 'addNewHallFormCustomizationSection' section visibility button image
    let visibilityButtonImage = <HTMLImageElement>document.getElementById("visibilityButtonImage");
    // Retrieving 'addNewHallFormCustomizationSection' section visibility button text
    let visibilityButtonText = document.getElementById("visibilityButtonText");
    // Retrieving 'hallSeatLayoutSection' element
    let hallSeatLayoutSection = document.getElementById("hallSeatLayoutSection");

    // When 'addNewHallFormCustomizationSection' is hidden
    if (customizationSectionId.style.display === "none") {
      customizationSectionId.style.display = "block";
      visibilityButtonImage.src = "assets/images/account/manager/locations-halls-sub-page/cinema-hall-icon.png";
      visibilityButtonText.innerText = "HIDE CUSTOMIZATION";
      hallSeatLayoutSection.style.height = "365px";
    } 
    else { // When 'addNewHallFormCustomizationSection' is shown
      customizationSectionId.style.display = "none";
      visibilityButtonImage.src = "assets/images/account/manager/locations-halls-sub-page/search-icon.png";
      visibilityButtonText.innerText = "SHOW CUSTOMIZATION";
      hallSeatLayoutSection.style.height = "605px";
    }
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


  // Function - splits string by '|' to blocks
  extractStringBlocks(text: string){
    let splitText = text.split("|");
    let textBlockArray = splitText;
    return textBlockArray;
  }
  

  // Function - creating seat layout grid table according to the entered no of rows and columns
  buildSeatLayout() {

    // Resetting 'noOfSeats' value to 0
    this.noOfSeats = 0;

    // If Condition - checking whether user has entered the number of rows and columns
    if(this.noOfRows == 0 && this.noOfColumns == 0){
      this.alertNotice("ERROR", "Enter No of Rows and Columns");
    }
    else if(this.noOfRows == 0 || this.noOfColumns == 0){
      if(this.noOfRows == 0){
        this.alertNotice("ERROR", "Enter No of Rows");
      }
      else if(this.noOfColumns == 0){
        this.alertNotice("ERROR", "Enter No of Columns");
      }
    }
    else{

      // If Condition - checking whether seatNumberAlphabetical toggle is true and noOfRows is above 26,
      // because automatic alphabetic seat numbering is not implemented for above 26 rows.
      if(this.seatNumberAlphabetical == true && this.noOfRows > 26){
        this.alertNotice("ERROR", "No of Rows is above 26, automatic alphabetic seat numbering not available above 26 rows. Apologies for the inconvenience.");
      }
      else{

        // Initialization - assigning new array into 'hallSeating'
        this.hallSeating = new Array();

        // Hiding initial text
        this.showInitialText = false;

        // Retrieving 'seatLayoutGridTable' element
        let gridTable = <HTMLTableElement>document.getElementById("seatLayoutGridTable");

        // Retrieving the no of rows existing in 'seatLayoutGridTable' element
        let existingNoOfRows = gridTable.rows.length;

        // If Condition - checking whether the number of rows is greater than or equal to 1
        if(existingNoOfRows >= 1){

          // For Loop - Iterating through the existing number of rows
          for (let tableRow = existingNoOfRows; tableRow >= 0; tableRow--) {
            // Removing each table row
            gridTable.deleteRow(tableRow-1);
          }
    
        }

        // Enabling hallSeatId to accept seat layout grid table row number
        this.hallSeatId = this.hallSeatId + "|";
        
        // For Loop - Iterating through the entered number of rows to create the table rows in the seat layout grid table
        for (let row = 0; row <= this.noOfRows - 1; row++) {


          // Declaration | Initialization - string to store seat numbering letter in each iteration
          let currentSeatNumberingLetter: String;
          
          // If Condition - checking whether seat number alphabetical toggle is true
          if(this.seatNumberAlphabetical == true){

            // Initializing array with the alphabetical order
            let alphabeticalOrder: String[] = [
              "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ];
            
            // Assigning current alphabet letter 
            currentSeatNumberingLetter = alphabeticalOrder[row];
          }
          

          // If condition - checking whether row is equal to 0
          if(row == 0){
            // Merging row number into hallSeatId
            this.hallSeatId = this.hallSeatId + (row + 1);
          }

          // Calling 'extractStringBlocks()' function to split 'hallSeatId' string to blocks
          let hallSeatIdBlockArr = this.extractStringBlocks(this.hallSeatId);

          // Creating new 'hallSeatId' using existing 'cinemaId', and 'hallId'
          this.hallSeatId = hallSeatIdBlockArr[0] + "|" + hallSeatIdBlockArr[1] + "|" + (row + 1);


          // Creating a new element - 'tr' - table row
          let gridTableRow = document.createElement('tr');

          // Assigning an element id for the created table row
          gridTableRow.id = 'Row-' + row;

          // Assigning table row into the 'seatLayoutGridTable' element
          gridTable.appendChild(gridTableRow);
          
          // Retrieving created seat layout grid table row
          let createdGridTableRow = document.getElementById('Row-' + row);

          // For Loop - Iterating through the entered number of columns to create the table cells in each table row in the seat layout grid table
          for (let columnCell = 0; columnCell <= this.noOfColumns - 1; columnCell++) {


            // If condition - checking whether columnCell is equal to 0
            if(columnCell == 0){
              // Enabling hallSeatId to accept seat layout grid table column cell
              this.hallSeatId = this.hallSeatId + "|";
            }

            // Calling 'extractStringBlocks()' function to split 'hallSeatId' string to blocks
            let hallSeatIdBlockArr = this.extractStringBlocks(this.hallSeatId);

            // Creating new 'hallSeatId' using existing 'cinemaId', 'hallId', and 'row'
            this.hallSeatId = hallSeatIdBlockArr[0] + "|" + hallSeatIdBlockArr[1] + "|" +  hallSeatIdBlockArr[2] + "|" + (columnCell + 1);


            // Incrementing 'noOfSeats' by one (post-increment) to identify total number of seats
            this.noOfSeats++;

            // Creating a new element - 'td' - table data
            let gridTableCell = document.createElement('td');



            // Declaration | Initialization - string to store seat numbering in each iteration 
            let seatNumbering: String;

            // If Condition - checking whether seat number alphabetical toggle is true or false
            if(this.seatNumberAlphabetical == true){
              // Assigning seat number by merging currentSeatNumberingLetter and columnCell value (incremented by 1 and converting to String)
              seatNumbering = currentSeatNumberingLetter + (columnCell + 1).toString();
            }
            else if(this.seatNumberAlphabetical == false){
              // Assigning seat number using noOfSeats value (incremented by 1 and converting to String)
              seatNumbering = this.noOfSeats.toString();
            }



            // Creating initial seating objects and populating with the seatId in each iteration
            let initialSeatDetails = {
              seatId: this.hallSeatId,
              seatActive: false,
              seatNumber: seatNumbering.toString(),
              seatUnavailable: false
            };

            // Pushing create 'initialSeatDetails' object to the 'hallSeating' array in each iteration
            this.hallSeating.push(initialSeatDetails);



            // CSS Styles - border color of 'td' element
            gridTableCell.style.borderColor = "rgb(96, 143, 230)";

            // CSS Styles - padding bottom of 'td' element
            gridTableCell.style.paddingBottom = "10px";

            // Assigning an ID (hallSeatId) to the created cell
            gridTableCell.id = "td|" + this.hallSeatId;

            // Creating a new element - 'BUTTON'
            let button = document.createElement('BUTTON');

            // Assigning an ID (hallSeatId) to the created button
            button.id = "btn|" + this.hallSeatId;

            // CSS Styles - background color of 'BUTTON' element
            button.style.backgroundColor = "rgb(96, 143, 230)";

            // 'BUTTON' event listener, executes when button is clicked
            button.addEventListener("click", ((event: CustomEvent) => {
              // Opening 'AssignHallSeatPopoverPage' popover for every button click
              this.openAssignHallSeatPopover(event, event.target);
            }) as EventListener);



            // Creating a new element - 'div'
            let div = document.createElement('div');

            // CSS Styles - border of 'DIV' element
            div.style.border = "2px solid #ffffff";

            // CSS Styles - background color of 'DIV' element
            div.style.backgroundColor = "#ffffff";

            // CSS Styles - border-radius of 'DIV' element
            div.style.borderRadius = "5px";

            // Assigning an ID (hallSeatId) to the created div
            div.id = "div|" + this.hallSeatId;



            // Creating a new element - 'p'
            let p = document.createElement('p');

            // Assigning an ID (hallSeatId) to the created p
            p.id = "p|" + this.hallSeatId;

            // Assigning text into 'p' element
            let pText = document.createTextNode(this.noOfSeats.toString());
            
            // Assigning 'pText' into 'p' element
            p.appendChild(pText);


            
            // Creating a new element - 'BUTTON'
            let divButton = document.createElement('BUTTON');

            // CSS Styles - background color of 'divButton' element
            divButton.style.backgroundColor = "#7A7E7B";

            // CSS Styles - font color of 'divButton' element
            divButton.style.color = "#ffffff";
            
            // CSS Styles - border-radius of 'divButton' element
            divButton.style.borderRadius = "5px";

            // CSS Styles - border-radius of 'width' element
            divButton.style.width = "35px";

            // CSS Styles - border-radius of 'height' element
            divButton.style.height = "30px";

            divButton.innerHTML = seatNumbering.toString();

            // Assigning an ID (hallSeatId) to the created divButton
            divButton.id = "divBtn|" + this.hallSeatId;



            // Assigning 'p' into 'div' element
            div.appendChild(p);

            // Assigning 'divButton' into 'div' element
            div.appendChild(divButton);

            // Assigning 'div' into 'BUTTON' element
            button.appendChild(div);

            // Assigning 'BUTTON' into 'td' element
            gridTableCell.appendChild(button);

            // Assigning 'td' into the create table row element
            createdGridTableRow.appendChild(gridTableCell);
          }
        }
      }
    }
  }

  addNewHall(form){

  }

}
