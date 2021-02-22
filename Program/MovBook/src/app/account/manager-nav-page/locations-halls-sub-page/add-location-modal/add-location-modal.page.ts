import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.page.html',
  styleUrls: ['./add-location-modal.page.scss'],
})
export class AddLocationModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewLocationForm Form
  addNewLocationForm: FormGroup;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning form validation
    this.addNewLocationForm = this.formBuilder.group({
      locationName: new FormControl('', Validators.required),
      locationAddressStreetAddress: new FormControl('', Validators.required),
      locationAddressCity: new FormControl('', Validators.required),
      locationAddressPostalCode: new FormControl('', Validators.required)
    });
    
  }

  // Implementation to close 'Add Location' modal
  async closeAddLocationModal(){
    await this.modalController.dismiss();
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

  // Function - Adding new location details into the database by passing through the server-side application
  addNewLocationDetails(locationDetailsFormValue){

    // Disabling form submit
    this.addNewLocationForm.invalid;

    this.managerService.addNewCinemaLocation(locationDetailsFormValue).subscribe((res) => {
      console.log('Success', res);

      // Showing success message box to user
      this.alertNotice("Added", "New Cinema Location Successfully Added");

      //alert("New Cinema Location Successfully Added");

      // Enabling form submit
      this.addNewLocationForm.valid;

      // TODO: Reload cinema locations list

      // Closing AddLocationModal modal
      //this.closeAddLocationModal();

    }, (error) => {
      console.log('Error', error);

      // Showing error message box to user
      this.alertNotice("ERROR", "Unable to add New Cinema Location");

      //alert("Unable to add New Cinema Location");

      // Enabling form submit
      this.addNewLocationForm.valid;
    });

  }

}
