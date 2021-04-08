import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal/add-new-showing-experience-modal.page';
import { UpdateAccountDetailsModalPage } from './update-account-details-modal/update-account-details-modal.page';

@Component({
  selector: 'app-settings-sub-page',
  templateUrl: './settings-sub-page.page.html',
  styleUrls: ['./settings-sub-page.page.scss'],
})
export class SettingsSubPagePage implements OnInit {

  // Declaration | Initialization - to handle visibility of 'noShowingExperienceAvailableText' block
  noShowingExperienceAvailableText: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerShowingExperience' block
  loadingSpinnerShowingExperience: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerRemoveShowingExperience' block
  loadingSpinnerRemoveShowingExperience: Boolean = false;

  // Declaration - To store retrieved showing experiences
  showingExperienceList = new Array();

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Retrieving showing experiences upon page render
    this.retrieveShowingExperiences();
    
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

    this.openUpdateAccountDetailsModal();
  }

  // Function - Implementation for opening the 'Update Account Details' modal
  async openUpdateAccountDetailsModal(){
    const updateAccountDetailsModal = await this.modalController.create({
      component: UpdateAccountDetailsModalPage,
      cssClass: 'update-account-details-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    updateAccountDetailsModal.present();
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

      console.log("Unable to retrieve showing experience");
    });

  }

}
