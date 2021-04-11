import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-assign-hall-seat-popover',
  templateUrl: './assign-hall-seat-popover.page.html',
  styleUrls: ['./assign-hall-seat-popover.page.scss'],
})
export class AssignHallSeatPopoverPage implements OnInit {

  // Declaration - FormGroup to handle assignSeatForm Form
  assignSeatForm: FormGroup;

  // Declaration | Initialization - storing passed seatObjectId value
  passedSeatObjectId: string = null;

  // Declaration | Initialization - storing passed seatId value
  passedSeatId: string = null;

  // Declaration | Initialization - storing passed seatActive value
  passedSeatActive: boolean = null;

  // Declaration | Initialization - storing passed seatNumber value
  passedSeatNumber: string = null;

  // Declaration | Initialization - storing passed seatUnavailable value
  passedSeatUnavailable: boolean = null;

  // Declaration | Initialization - storing passed seatAllocatedPositionNo value
  passedSeatAllocatedPositionNo: boolean = null;

  // Declaration | Initialization - storing passed seatActive value
  responseData = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
    // Assigning variable with passed 'passingSeatObjectId'
    this.passedSeatObjectId = this.navParams.get('passingSeatObjectId') ? this.navParams.get('passingSeatObjectId') : null;

    // Assigning variable with passed 'passingSeatId'
    this.passedSeatId = this.navParams.get('passingSeatId');
    
    // Assigning variable with passed 'passingSeatActive'
    this.passedSeatActive = this.navParams.get('passingSeatActive');
    
    // Assigning variable with passed 'passingSeatNumber'
    this.passedSeatNumber = this.navParams.get('passingSeatNumber');

    // Assigning variable with passed 'passingSeatUnavailable'
    this.passedSeatUnavailable = this.navParams.get('passingSeatUnavailable');

    // Assigning variable with passed 'passingSeatAllocatedPositionNo'
    this.passedSeatAllocatedPositionNo = this.navParams.get('passingSeatAllocatedPositionNo') ? this.navParams.get('passingSeatAllocatedPositionNo') : null;
    
    // Assigning form validation
    this.assignSeatForm = this.formBuilder.group({
      seatActive: new FormControl(false, Validators.required),
      seatNumber: new FormControl('', Validators.required),
      seatUnavailable: new FormControl(false)
    });

    // Assigning the existing values into the add new hall form
    this.assignSeatForm.setValue({
      seatActive: this.passedSeatActive,
      seatNumber: this.passedSeatNumber,
      seatUnavailable: this.passedSeatUnavailable
    })

    // Setting initial seat active toggle value
    this.setSeatActiveToggle(this.passedSeatActive);
    // Setting user interface component visibility
    this.enableField();

  }

  // Function - Changing visibility of elements
  enableField(){

    // Retrieving seatNumberInputLabel element
    let seatNumberInputLabelId = document.getElementById("seatNumberInputLabel");

    // Retrieving seatNumberInput element
    let seatNumberInputId = document.getElementById("seatNumberInput");

    // Retrieving seatUnavailableToggle element
    let seatUnavailableToggleId = document.getElementById("seatUnavailableToggle");

    // If condition - checking whether seatActiveToggle is equal to true
    if(this.seatActiveToggle == true){
      seatNumberInputLabelId.style.display = "block";
      seatNumberInputId.style.display = "block";
      seatUnavailableToggleId.style.display = "block";
    }
    else{
      seatNumberInputLabelId.style.display = "none";
      seatNumberInputId.style.display = "none";
      seatUnavailableToggleId.style.display = "none";
    }

  }

  // Declaration | Initialization - To store seatActiveToggle status
  seatActiveToggle: boolean = this.passedSeatActive;

  // Function - assigning seatActiveToggle when toggled in user interface
  setSeatActiveToggle(seatActiveToggle: boolean){
    this.seatActiveToggle = seatActiveToggle;
    this.enableField();
  }

  // Function - Preparing response data according to the user populated preferences
  assignHallSeatDetails(formValue){

    // Checking the availability of parameters and passing the relevant data through
    if(this.passedSeatObjectId != null){
      // Possible instance:
      //  - 'Edit Cinema Hall' functionality
      // If 'passedSeatObjectId' is available
      // Assigning user populated preferences
      this.responseData = {
        _id: this.passedSeatObjectId,
        seatId: this.passedSeatId,
        seatActive: formValue.seatActive,
        seatNumber: formValue.seatNumber,
        seatUnavailable: formValue.seatActive == false ? false : formValue.seatUnavailable,
        seatAllocatedPositionNo: this.passedSeatAllocatedPositionNo
      };
    }
    else if(this.passedSeatAllocatedPositionNo != null){
      // Possible instance:
      //  - 'Add New Cinema Hall' functionality
      // If 'passedSeatAllocatedPositionNo' is available
      // Assigning user populated preferences
      this.responseData = {
        seatId: this.passedSeatId,
        seatActive: formValue.seatActive,
        seatNumber: formValue.seatNumber,
        seatUnavailable: formValue.seatActive == false ? false : formValue.seatUnavailable,
        seatAllocatedPositionNo: this.passedSeatAllocatedPositionNo
      };
    }

    // Closing 'assignHallSeatPopover' popover
    this.closeAssignHallSeatPopover();

  }

  // Function - Implementation to close 'closeAssignHallSeatPopover' popover
  async closeAssignHallSeatPopover(){
    await this.popoverController.dismiss(this.responseData);
  }

}
