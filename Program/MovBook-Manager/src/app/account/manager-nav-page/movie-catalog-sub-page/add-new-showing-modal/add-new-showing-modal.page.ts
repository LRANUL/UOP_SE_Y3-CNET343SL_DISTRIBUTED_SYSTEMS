import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-add-new-showing-modal',
  templateUrl: './add-new-showing-modal.page.html',
  styleUrls: ['./add-new-showing-modal.page.scss'],
})
export class AddNewShowingModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewShowingForm form
  addNewShowingForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning form validation to AddNewShowingForm
    this.addNewShowingForm = this.formBuilder.group({
      cinemaLocation: new FormControl('', Validators.required),
      cinemaHall: new FormControl('', Validators.required),
      showingPeriodStartDate: new FormControl('', Validators.required),
      showingPeriodEndDate: new FormControl('', Validators.required),
      timeSlotStartTime: new FormControl('', Validators.required),
      timeSlotEndTime: new FormControl('', Validators.required),
      ticketCostChild: new FormControl('', Validators.required),
      ticketCostAdult: new FormControl('', Validators.required),
      showingExperience: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Add New Showing' modal
  async closeAddNewShowingModal(){
    await this.modalController.dismiss();
  }

}
