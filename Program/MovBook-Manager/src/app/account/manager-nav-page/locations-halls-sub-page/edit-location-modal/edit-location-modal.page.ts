import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-edit-location-modal',
  templateUrl: './edit-location-modal.page.html',
  styleUrls: ['./edit-location-modal.page.scss'],
})
export class EditLocationModalPage implements OnInit {

  // Declaration - FormGroup to handle editCinemaLocationForm form
  editCinemaLocationForm: FormGroup;
  
  // Declaration | Initialization - Stores status of editing cinema location details
  editCinemaLocationStatus: Boolean = false;

  // Declaration | Initialization - string variable to store passingCinemaLocation
  passedCinemaLocation = null;

  // Declaration | Initialization - To handle visibility of 'loadingSpinnerEditCinemaLocation' loading spinner
  loadingSpinnerEditCinemaLocation: Boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    // Assigning variable with passed 'passingCinemaLocation'
    this.passedCinemaLocation = this.navParams.get('passingCinemaLocation');

    // Assigning 'editCinemaLocationForm' form validation
    this.editCinemaLocationForm = this.formBuilder.group({
      locationName: new FormControl('', Validators.required),
      locationAddressStreetAddress: new FormControl('', Validators.required),
      locationAddressCity: new FormControl('', Validators.required),
      locationAddressPostalCode: new FormControl('', Validators.required)
    });

    // Assigning existing values to the 'editCinemaLocationForm' form
    this.editCinemaLocationForm.patchValue({
      locationName: this.passedCinemaLocation.cinemaLocationName,
      locationAddressStreetAddress: this.passedCinemaLocation.cinemaLocationAddress.streetAddress,
      locationAddressCity: this.passedCinemaLocation.cinemaLocationAddress.city,
      locationAddressPostalCode: this.passedCinemaLocation.cinemaLocationAddress.postalCode,
    });

  }

  // Implementation to close 'Edit Location' modal
  async closeEditLocationModal(){
    await this.modalController.dismiss(this.editCinemaLocationStatus);
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

  // Edit Location Success Alert Box Implementation
  async editLocationSuccessAlertBox (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Closing EditLocationModal
          this.closeEditLocationModal();
        }
      }]
    });
    await alert.present();
  }

   // Function - Edit Cinema Location Alert Box Implementation
   async editCinemaLocationAlert( title: string, content: string, cinemaLocationFormData ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Remove Movie from Wait List Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            // Edit cinema location details
            this.editCinemaLocationDetails(cinemaLocationFormData);

          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Edit cinema location details
  editCinemaLocationDetails(cinemaLocationFormData){
    
    if(cinemaLocationFormData.locationName != this.passedCinemaLocation.cinemaLocationName || 
      cinemaLocationFormData.locationAddressStreetAddress != this.passedCinemaLocation.cinemaLocationAddress.streetAddress || 
      cinemaLocationFormData.locationAddressCity != this.passedCinemaLocation.cinemaLocationAddress.city || 
      cinemaLocationFormData.locationAddressPostalCode != this.passedCinemaLocation.cinemaLocationAddress.postalCode){

      // Assigning loading spinner to true, starts loading spinner
      this.loadingSpinnerEditCinemaLocation = true;

       // Passing updated cinema location details to the server-side application to update the database
       this.managerService.updateCinemaLocation(this.passedCinemaLocation._id, cinemaLocationFormData)
      .subscribe((cinemaLocationUpdateResponse: any) => {

        if(cinemaLocationUpdateResponse.message == "Cinema location updated"){
          // Assigning loading spinner to false - stops spinning
          this.loadingSpinnerEditCinemaLocation = false;

          // Assigning function status to true
          this.editCinemaLocationStatus = true;

          // Showing success message box to user
          this.editLocationSuccessAlertBox("Updated", "Cinema Location Updated");

          // Enabling form submit
          this.editCinemaLocationForm.valid;
        }
        else{
          // Assigning loading spinner to false - stops spinning
          this.loadingSpinnerEditCinemaLocation = false;

          // Assigning function status to false
          this.editCinemaLocationStatus = false;
          
          console.log('Error - Unable to update cinema location');

          // Showing error message box to user
          this.alertNotice("ERROR", "Unable to update cinema location");

          // Enabling form submit
          this.editCinemaLocationForm.valid;
        }

      }, (error: ErrorEvent) => {
        // Assigning loading spinner to false - stops spinning
        this.loadingSpinnerEditCinemaLocation = false;

        // Assigning function status to false
        this.editCinemaLocationStatus = false;
        
        console.log('Error - Unable to update cinema location: ', error);

        // Showing error message box to user
        this.alertNotice("ERROR", "Unable to update cinema location");

        // Enabling form submit
        this.editCinemaLocationForm.valid;
      });

    }
    else{

      // Showing invalid message box to the user
      this.alertNotice("NOT EDITED", "Details were not edited.");

    }

  }

}
