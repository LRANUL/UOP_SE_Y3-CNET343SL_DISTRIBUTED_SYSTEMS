import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AssignHallSeatPopoverPage } from '../assign-hall-seat-popover/assign-hall-seat-popover.page';
import { CinemaHallsModalPage } from '../cinema-halls-modal/cinema-halls-modal.page';

@Component({
  selector: 'app-add-hall-modal',
  templateUrl: './add-hall-modal.page.html',
  styleUrls: ['./add-hall-modal.page.scss'],
})
export class AddHallModalPage implements OnInit {

  addNewHallForm: FormGroup;
  
  passedCinemaId = null;

  hallSeatId = null;

  showInitialText: Boolean = true;

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
      noOfColumns: new FormControl('', Validators.required)
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

  // Implementation for opening the 'AssignHallSeat' popover
  async openAssignHallSeatPopover(evt: Event, seatId){
    const assignHallSeatPopover = await this.popoverController.create({
      component: AssignHallSeatPopoverPage,
      componentProps: {
        seatId: seatId
      },
      event: evt,
      // Disabling popover closing from any outside clicks
      backdropDismiss: false
    });

    assignHallSeatPopover.present();

    const { data } = await assignHallSeatPopover.onDidDismiss();

    console.log(data);
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


  // Function - splits string by '|' to blocks
  extractStringBlocks(text: string){
    let splitText = text.split("|");
    let textBlockArray = splitText;
    return textBlockArray;
  }
  

  // Function - creating seat layout grid table according to the entered no of rows and columns
  buildSeatLayout() {

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

          // Assigning an ID (hallSeatId) to the created cell
          gridTableCell.id = this.hallSeatId;

          // CSS Styles - border color of 'td' element
          gridTableCell.style.borderColor = "rgb(96, 143, 230)";
          // CSS Styles - padding bottom of 'td' element
          gridTableCell.style.paddingBottom = "10px";

          // Creating a new element - 'BUTTON'
          let button = document.createElement('BUTTON');

          // CSS Styles - background color of 'BUTTON' element
          button.style.backgroundColor = "rgb(96, 143, 230)";

          // 'BUTTON' event listener, executes when button is clicked
          button.addEventListener("click", ((event: CustomEvent) => {
            // Opening 'AssignHallSeatPopoverPage' popover for every button click
            this.openAssignHallSeatPopover(event, gridTableCell.id);
          }) as EventListener);
          
          // HTML source code within 'BUTTON' element
          /**
           * <div>
           *  <p></p>
           *  <button></button>
           * </div>
           */
          button.innerHTML = "<div style='border: 2px solid #ffffff;" +
                                        "background-color: #ffffff;" +
                                        "border-radius: 5px;'>" +
            "<p>"+ this.noOfSeats +"</p>" +
            "<button style='background-color: rgb(50, 195, 159);" +
                            "border-radius: 5px;" +
                            "width: 30px;" +
                            "height: 30px;'>" + columnCell + "</button>" +
          "</div>";

          // Assigning 'BUTTON' into 'td' element
          gridTableCell.appendChild(button);

          // Assigning 'td' into the create table row element
          createdGridTableRow.appendChild(gridTableCell);
        }
      }
    }
  }

  /*
   var table = <HTMLTableElement>document.getElementById("seatLayoutTable");
  for(let rowCount = 0; rowCount < 1; rowCount++){
      let row = table.insertRow(0);
      for(let columnCount = 0;columnCount < this.noOfColumns;columnCount++) {
        let tableCell = row.insertCell(columnCount);
        tableCell.innerHTML = "<div style='border: 2px solid #ccc;'>" +
          "<ion-button style='margin: 5px; " +
                          "border: 2px solid #ccc; " +
                          "width: 30px;" +
                          "height: 30px;' id='btn'>kk</ion-button>" +
        "</div>";
        let button = document.getElementById('btn');
        button.addEventListener('onclick', this.alertff);
        tableCell.appendChild(button);
      }
    }*/

  // removeRow(){
  //   let seatLayoutTable = <HTMLTableElement>document.getElementById("seatLayoutTable");
  //   let noOfRows = seatLayoutTable.rows.length;
  //   seatLayoutTable.deleteRow(noOfRows-1);
  // }

  addNewHall(form){

  }

  


}
