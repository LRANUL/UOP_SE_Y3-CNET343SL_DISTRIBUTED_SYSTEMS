import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ShowingExperience } from 'src/app/models/account/manager/showing-experience';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-add-new-showing-experience-modal',
  templateUrl: './add-new-showing-experience-modal.page.html',
  styleUrls: ['./add-new-showing-experience-modal.page.scss'],
})
export class AddNewShowingExperienceModalPage implements OnInit {

  // Declaration - FormGroup to handle addNewShowingExperienceForm form
  addNewShowingExperienceForm: FormGroup;
  
  // Declaration | Initialization - Stores status of adding new showing experience details
  addNewShowingExperienceStatus: Boolean = false;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    
    // Assigning 'addNewShowingExperienceForm' form validation
    this.addNewShowingExperienceForm = this.formBuilder.group({
      showingExperience: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Add New Showing Experience' modal and pass experience insertion status
  async closeAddNewShowingExperienceModal(){
    await this.modalController.dismiss(this.addNewShowingExperienceStatus);
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

  // Function - Adding new showing experiences details into the database by passing through the server-side application
  addNewShowingExperienceDetails(experienceDetailsFormValue: ShowingExperience){

    // Disabling form submit
    this.addNewShowingExperienceForm.invalid;

    // Retrieving the now showing movies
    this.managerService.addNewShowingExperience(experienceDetailsFormValue)
      .subscribe((responseShowingExperience: any) => {

      if(responseShowingExperience.message == "Showing experience added"){

        // Showing success message box to the user
        this.alertNotice("Showing Experience Added", "Showing experience was successfully added.");

        console.log("Showing Experience Added");

        // Updating 'addNewShowingExperienceStatus' to true
        this.addNewShowingExperienceStatus = true;

        // Enabling form submit
        this.addNewShowingExperienceForm.valid;

      }
      else if(responseShowingExperience.message == "Error - Unable to add showing experience"){

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve showing experiences, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve showing experiences");

        // Updating 'addNewShowingExperienceStatus' to false
        this.addNewShowingExperienceStatus = false;

        // Enabling form submit
        this.addNewShowingExperienceForm.valid;

      }

    }, (error: ErrorEvent) => {
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve showing experiences, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve showing experiences");

      // Updating 'addNewShowingExperienceStatus' to false
      this.addNewShowingExperienceStatus = false;

      // Enabling form submit
      this.addNewShowingExperienceForm.valid;
    });

  }



}
