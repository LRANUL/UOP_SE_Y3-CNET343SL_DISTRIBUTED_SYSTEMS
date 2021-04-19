import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal/add-new-showing-experience-modal.page';
import { EditShowingExperienceModalPage } from './edit-showing-experience-modal/edit-showing-experience-modal.page';
import { UpdateAccountDetailsModalPage } from './update-account-details-modal/update-account-details-modal.page';

@Component({
  selector: 'app-settings-sub-page',
  templateUrl: './settings-sub-page.page.html',
  styleUrls: ['./settings-sub-page.page.scss'],
})
export class SettingsSubPagePage implements OnInit {

  // Declaration - FormGroup to handle loginCredentialsVerificationForm form
  loginCredentialsVerificationForm: FormGroup;

  // Declaration | Initialization - to handle visibility of 'noShowingExperienceAvailableText' block
  noShowingExperienceAvailableText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerShowingExperience' block
  loadingSpinnerShowingExperience: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerRemoveShowingExperience' block
  loadingSpinnerRemoveShowingExperience: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerVerifyCredentials' block
  loadingSpinnerVerifyCredentials: Boolean = false;

  // Declaration - To store retrieved showing experiences
  showingExperienceList = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private managerService: ManagerService,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {

    // Retrieving showing experiences upon page render
    this.retrieveShowingExperiences();

    // Assigning 'loginCredentialsVerificationForm' form validation
    this.loginCredentialsVerificationForm = this.formBuilder.group({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

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

  // Function - Implementation for opening the 'Add New Showing Experience' modal
  async openAddNewShowingExperienceModal(){
    const addNewShowingExperienceModal = await this.modalController.create({
      component: AddNewShowingExperienceModalPage,
      cssClass: 'add-new-showing-experience-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addNewShowingExperienceModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await addNewShowingExperienceModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Retrieving updated list of showing experiences
        this.retrieveShowingExperiences();
      }
    }
  }

  // Function - Implementation for opening the 'Edit Showing Experience' modal
  async openEditShowingExperienceModal(showingExperience: any){
    const editShowingExperienceModal = await this.modalController.create({
      component: EditShowingExperienceModalPage,
      cssClass: 'add-new-showing-experience-modal',
      componentProps: {
        passingShowingExperienceId: showingExperience._id,
        passingShowingExperience: showingExperience.showingExperience,
        passingShowingExperienceDescription: showingExperience.description
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    editShowingExperienceModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await editShowingExperienceModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Retrieving updated list of showing experiences
        this.retrieveShowingExperiences();
      }
    }

  }

  // Function - Implementation for opening the 'Update Account Details' modal
  async openUpdateAccountDetailsModal(enterEmailAddress: String){
    const updateAccountDetailsModal = await this.modalController.create({
      component: UpdateAccountDetailsModalPage,
      cssClass: 'update-account-details-modal',
      componentProps: {
        passingEnteredEmailAddress: enterEmailAddress
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    updateAccountDetailsModal.present();
  }

  // Function - Remove Showing Experience Alert Box Implementation
  async removeShowingExperienceAlert( title: string, content: string, showingExperienceId: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Remove Showing Experience Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {

            this.removeShowingExperience(showingExperienceId);

          }
        }
      ]
    });
    await alert.present();
  }

  // Remove showing experience from the database
  removeShowingExperience(showingExperienceId: string){

    // Assigning 'loadingSpinnerRemoveShowingExperience' to true (starts loading spinner)
    this.loadingSpinnerRemoveShowingExperience = true;

    // Passing 'showingExperienceId' to the backend to remove the showing experience
    this.managerService.removeShowingExperience(showingExperienceId)
      .subscribe((deletionResponse: any) => {

      if(deletionResponse.message == "Showing experience removed"){

        // Retrieving the updated list of showing experiences
        this.retrieveShowingExperiences();

        // Assigning 'loadingSpinnerRemoveShowingExperience' to true (stops loading spinner)
        this.loadingSpinnerRemoveShowingExperience = false;

        // Showing success message box to the user
        this.alertNotice("Removed", "Showing experiences has been successfully removed.");

      }
      else{
        // Assigning 'loadingSpinnerRemoveShowingExperience' to true (stops loading spinner)
        this.loadingSpinnerRemoveShowingExperience = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to remove showing experience, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to remove showing experience");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerRemoveShowingExperience' to true (stops loading spinner)
      this.loadingSpinnerRemoveShowingExperience = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to remove showing experience, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to remove showing experience: ", error);
    });

  }

  // Retrieving list of showing experiences from the database
  retrieveShowingExperiences() {

    // Assigning 'loadingSpinnerShowingExperience' to true (starts loading spinner)
    this.loadingSpinnerShowingExperience = true;

    // Assigning 'noShowingExperienceAvailableText' to false (removes no showing experience available text section)
    this.noShowingExperienceAvailableText = false;

    // Retrieving the showing experiences
    this.managerService.retrieveListOfShowingExperiences()
      .subscribe((retrievedShowingExperiences: any) => {

      if(retrievedShowingExperiences.message == "Showing experiences retrieved"){

        // Assigning 'loadingSpinnerShowingExperience' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

        // Assigning retrieve movie list to 'showingExperienceList' array
        this.showingExperienceList = retrievedShowingExperiences.returnedData;

      }
      else if(retrievedShowingExperiences.message == "No showing experiences available"){

        // Assigning 'loadingSpinnerShowingExperience' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

        // Assigning 'noShowingExperienceAvailableText' to true (adds no showing experience available text section)
        this.noShowingExperienceAvailableText = true;

      }
      else{

        // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
        this.loadingSpinnerShowingExperience = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve showing experience, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve showing experience");

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerWaitListedMovies' to false (stops loading spinner)
      this.loadingSpinnerShowingExperience = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve showing experience, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve showing experience: ", error);
    });

  }


  // Function - Verifying entered login credentials
  verifyLoginCredentials(loginCredentialsFormData) {

    // Assigning 'loadingSpinnerVerifyCredentials' to true (starts loading spinner)
    this.loadingSpinnerVerifyCredentials = true;

    this.authService.verifyLoginCredentials(loginCredentialsFormData.emailAddress, loginCredentialsFormData.password)
      .subscribe((verificationResponse: any) => {

      if(verificationResponse.message == "Login Check Successful"){
        // Assigning 'loadingSpinnerVerifyCredentials' to false (stops loading spinner)
        this.loadingSpinnerVerifyCredentials = false;

        // Resetting the 'loginCredentialsVerificationForm' form
        this.loginCredentialsVerificationForm.reset();

        // Opening 'openUpdateAccountDetailsModal' modal to allow user to edit the account details
        this.openUpdateAccountDetailsModal(loginCredentialsFormData.emailAddress);
      }
      else{
        // Assigning 'loadingSpinnerVerifyCredentials' to false (stops loading spinner)
        this.loadingSpinnerVerifyCredentials = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", verificationResponse.message);

        console.log("Unable to verify credentials: ", verificationResponse.message);
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerVerifyCredentials' to false (stops loading spinner)
      this.loadingSpinnerVerifyCredentials = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to verify credentials, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to verify credentials: ", error);
    });
  }


}
