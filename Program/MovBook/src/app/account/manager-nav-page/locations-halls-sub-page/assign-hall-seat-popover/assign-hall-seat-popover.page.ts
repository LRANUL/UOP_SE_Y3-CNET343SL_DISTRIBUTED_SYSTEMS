import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-assign-hall-seat-popover',
  templateUrl: './assign-hall-seat-popover.page.html',
  styleUrls: ['./assign-hall-seat-popover.page.scss'],
})
export class AssignHallSeatPopoverPage implements OnInit {

  assignSeatForm: FormGroup;

  passedSeatId: string = null;

  passedSeatActive: boolean = null;

  passedSeatNumber: string = null;

  passedSeatUnavailable: boolean = null;

  responseDate = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    // Assigning variable with passed 'passingSeatId'
    this.passedSeatId = this.navParams.get('passingSeatId');

    // Assigning variable with passed 'passingSeatActive'
    this.passedSeatActive = this.navParams.get('passingSeatActive');

    
    // Assigning variable with passed 'passingSeatNumber'
    this.passedSeatNumber = this.navParams.get('passingSeatNumber');

    // Assigning variable with passed 'passingSeatUnavailable'
    this.passedSeatUnavailable = this.navParams.get('passingSeatUnavailable');

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

  }

  enableField(){

    let seatNumberInputId = document.getElementById("seatNumberInput");
    let seatUnavailableToggleId = document.getElementById("seatUnavailableToggle");

    if(this.seatActiveToggle == true){console.log('2ff');
      seatNumberInputId.style.display = "block";
      seatUnavailableToggleId.style.display = "block";
    }
    else{
      seatNumberInputId.style.display = "none";
      seatUnavailableToggleId.style.display = "none";
    }

  }

  // Declaration | Initialization - To store seatActiveToggle status
  seatActiveToggle: boolean = this.passedSeatActive;

  // Function - assigning seatActiveToggle when toggled in user interface
  setSeatActiveToggle(seatActiveToggle: boolean){console.log(seatActiveToggle);
    this.seatActiveToggle = seatActiveToggle;
    this.enableField();
  }

  


  assignHallSeatDetails(formValue){
    this.responseDate = {
      seatId: this.passedSeatId,
      seatActive: formValue.seatActive,
      seatNumber: formValue.seatNumber,
      seatUnavailable: formValue.seatUnavailable
    };

    this.closeAssignHallSeatPopover();

  }

  async closeAssignHallSeatPopover(){
    await this.popoverController.dismiss(this.responseDate);
  }

}
