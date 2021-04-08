import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal/add-new-showing-experience-modal.page';

@Component({
  selector: 'app-settings-sub-page',
  templateUrl: './settings-sub-page.page.html',
  styleUrls: ['./settings-sub-page.page.scss'],
})
export class SettingsSubPagePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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
        this.retrieveCinemaLocations();
      }
    }
  }

  retrieveCinemaLocations() {
    
  }

}
