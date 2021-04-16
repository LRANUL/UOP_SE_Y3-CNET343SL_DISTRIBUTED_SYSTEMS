import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-update-beverage-modal',
  templateUrl: './update-beverage-modal.page.html',
  styleUrls: ['./update-beverage-modal.page.scss'],
})
export class UpdateBeverageModalPage implements OnInit {

  // Declaration - FormGroup to handle editBeverageDetailsForm form
  editBeverageDetailsForm: FormGroup;
  
  // Declaration | Initialization - Stores status of edit beverage details
  editBeverageDetailsStatus: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerBeverageDetails' block
  loadingSpinnerBeverageDetails: Boolean = false;
  
  // Declaration | Initialization - string variable to store passingBeverageObjectId
  passedBeverageObjectId = null;

  // Declaration | Initialization - string variable to store passingBeverageName
  passedBeverageName = null;
  
  // Declaration | Initialization - string variable to store passingBeverageImageURL
  passedBeverageImageURL = null;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    // Assigning variable with 'passingBeverageObjectId'
    this.passedBeverageObjectId = this.navParams.get('passingBeverageObjectId');

    // Assigning variable with 'passingBeverageName'
    this.passedBeverageName = this.navParams.get('passingBeverageName');

    // Assigning variable with 'passingBeverageImageURL'
    this.passedBeverageImageURL = this.navParams.get('passingBeverageImageURL');
    
    // Assigning 'editBeverageDetailsForm' form validation
    this.editBeverageDetailsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });

    this.editBeverageDetailsForm.patchValue({
      name: this.passedBeverageName,
      imageUrl: this.passedBeverageImageURL
    });

  }

  // Implementation to close 'Updated Beverage' modal and pass beverage details update status
  async closeUpdateBeverageModal(){
    await this.modalController.dismiss(this.editBeverageDetailsStatus);
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

  // Function - Edit Beverage Details Success Alert Box Implementation
  async editBeverageDetailsSuccessAlertBox (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Closing UpdateBeverageDetails modal
          this.closeUpdateBeverageModal();
        }
      }]
    });
    await alert.present();
  }

  // Function - Updating beverage name and image url
  updateBeverageDetails(editBeverageDetailsFormData){

    // Checking whether any details were updated from the existing details
    if(this.passedBeverageName != editBeverageDetailsFormData.name || 
    this.passedBeverageImageURL != editBeverageDetailsFormData.imageUrl){

      // Assigning 'loadingSpinnerBeverageDetails' to true (starts loading spinner)
      this.loadingSpinnerBeverageDetails = true;

      // Disabling form submit
      this.editBeverageDetailsForm.invalid;
  
      // Editing showing experience
      this.managerService.updateRefreshmentNameImageURL(
        this.passedBeverageObjectId, 
        editBeverageDetailsFormData.name, 
        editBeverageDetailsFormData.imageUrl
        ).subscribe((beverageUpdateResponse: any) => {
  
        if(beverageUpdateResponse.message == "Refreshment updated"){
  
          // Assigning 'loadingSpinnerBeverageDetails' to false (stops loading spinner)
          this.loadingSpinnerBeverageDetails = false;
  
          // Showing success message box to the user
          this.editBeverageDetailsSuccessAlertBox("Beverage Details Updated", "Beverage details was successfully updated.");
  
          // Updating 'editBeverageDetailsStatus' to true
          this.editBeverageDetailsStatus = true;
  
          // Enabling form submit
          this.editBeverageDetailsForm.valid;
  
        }
        else if(beverageUpdateResponse.message == "Unable to update refreshment"){
  
          // Assigning 'loadingSpinnerBeverageDetails' to false (stops loading spinner)
          this.loadingSpinnerBeverageDetails = false;
  
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to edit beverage details, apologies for the inconvenience. Please contact administrator.");
  
          console.log("Unable to edit beverage details");
  
          // Updating 'editBeverageDetailsStatus' to false
          this.editBeverageDetailsStatus = false;
  
          // Enabling form submit
          this.editBeverageDetailsForm.valid;
  
        }
  
      }, (error: ErrorEvent) => {
        // Assigning 'loadingSpinnerBeverageDetails' to false (stops loading spinner)
        this.loadingSpinnerBeverageDetails = false;
  
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to edit beverage details, apologies for the inconvenience. Please contact administrator.");
  
        console.log("Unable to edit beverage details");
  
        // Updating 'editBeverageDetailsStatus' to false
        this.editBeverageDetailsStatus = false;
  
        // Enabling form submit
        this.editBeverageDetailsForm.valid;
      });

    }
    else{

      // Showing information message box to the user
      this.alertNotice("Details Not Updated", "Beverage details are not updated.");
  
      console.log("Details are not updated.");

    }
   
  }
  
  
}
