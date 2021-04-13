import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-add-beverage-modal',
  templateUrl: './add-beverage-modal.page.html',
  styleUrls: ['./add-beverage-modal.page.scss'],
})
export class AddBeverageModalPage implements OnInit {

  // Declaration - FormGroup to handle addBeverageForm form
  addBeverageForm: FormGroup;

  // Declaration | Initialization - To handle the functionality status
  addBeverageStatus: Boolean = false;

  // Declaration | Initialization - To handle visibility of 'loadingSpinnerAddBeverage' loading spinner
  loadingSpinnerAddBeverage: Boolean = false;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning 'addBeverageForm' form validation
    this.addBeverageForm = this.formBuilder.group({
      beverageName: new FormControl('', Validators.required),
      beverageImageLink: new FormControl('', Validators.required),
      beveragePrice: new FormControl('', Validators.required),
      beverageQuantity: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Add Beverage' modal
  async closeAddBeverageModal(){
    await this.modalController.dismiss(this.addBeverageStatus);
  }

  // Confirm Box Implementation - Add Beverage
  async confirmBoxAddBeverage (title: string, content: string, addBeverageFormData) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Confirm Box: Request denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Confirm Box: Request accepted");

            // Add Beverage Details
            this.addNewBeverageDetails(addBeverageFormData);
          }
        }
      ]
    });
    await alert.present();
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

  // Alert Box Implementation
  async addBeverageSuccessAlertBox (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Closing AddBeverageModal
          this.closeAddBeverageModal();
        }
      }]
    });
    await alert.present();
  }

  // Function - Adding new beverage details into the database by passing through the server-side application
  addNewBeverageDetails(addBeverageFormData){

    // Assigning function status to false
    this.addBeverageStatus = false;

    // Assigning loading spinner to false - starts spinning
    this.loadingSpinnerAddBeverage = true;

    // Disabling form submit
    this.addBeverageForm.invalid;

    this.managerService.addBeverage(addBeverageFormData)
      .subscribe((addBeverageResponse: any) => {

      if(addBeverageResponse.message == "New refreshment added"){
        // Assigning loading spinner to false - stops spinning
        this.loadingSpinnerAddBeverage = false;

        // Assigning function status to true
        this.addBeverageStatus = true;

        // Showing success message box to user
        this.addBeverageSuccessAlertBox("Added", "New Beverage Successfully Added");

        // Enabling form submit
        this.addBeverageForm.valid;
      }
      else{
        // Assigning loading spinner to false - stops spinning
        this.loadingSpinnerAddBeverage = false;

        // Assigning function status to false
        this.addBeverageStatus = false;
        
        console.log('Error - Unable to add beverage');

        // Showing error message box to user
        this.alertNotice("ERROR", "Unable to add Beverage");

        // Enabling form submit
        this.addBeverageForm.valid;
      }

    }, (error: ErrorEvent) => {
      // Assigning loading spinner to false - stops spinning
      this.loadingSpinnerAddBeverage = false;

      // Assigning function status to false
      this.addBeverageStatus = false;
      
      console.log('Error - Unable to add beverage: ', error);

      // Showing error message box to user
      this.alertNotice("ERROR", "Unable to add Beverage");

      // Enabling form submit
      this.addBeverageForm.valid;
    });

  }

}
