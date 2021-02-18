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

  passedSeatId = null;

  responseDate = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Assigning variable with passed 'seatId'
    this.passedSeatId = this.navParams.get('seatId');

    this.assignSeatForm = this.formBuilder.group({
      seatActive: new FormControl(false, Validators.required),
      seatNumber: new FormControl('', Validators.required),
      seatUnavailable: new FormControl(false)
    });
  }

  assignHallSeat(formValue){
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
