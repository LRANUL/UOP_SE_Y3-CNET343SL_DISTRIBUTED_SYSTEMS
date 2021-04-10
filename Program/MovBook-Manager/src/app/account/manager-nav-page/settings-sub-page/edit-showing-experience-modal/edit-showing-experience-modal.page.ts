import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { ShowingExperience } from 'src/app/models/account/manager/showing-experience';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-edit-showing-experience-modal',
  templateUrl: './edit-showing-experience-modal.page.html',
  styleUrls: ['./edit-showing-experience-modal.page.scss'],
})
export class EditShowingExperienceModalPage implements OnInit {

  // Declaration - FormGroup to handle editShowingExperienceForm form
  editShowingExperienceForm: FormGroup;
  
  // Declaration | Initialization - Stores status of edit showing experience details
  editShowingExperienceStatus: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerEditShowingExperience' block
  loadingSpinnerEditShowingExperience: Boolean = false;
  
  // Declaration | Initialization - string variable to store passingShowingExperienceId
  passedShowingExperienceId = null;

  // Declaration | Initialization - string variable to store passingShowingExperience
  passedShowingExperience = null;
  
  // Declaration | Initialization - string variable to store passingShowingExperienceDescription
  passedShowingExperienceDescription = null;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    // Assigning variable with 'passingShowingExperienceId'
    this.passedShowingExperienceId = this.navParams.get('passingShowingExperienceId');

    // Assigning variable with 'passingShowingExperience'
    this.passedShowingExperience = this.navParams.get('passingShowingExperience');

    // Assigning variable with 'passingShowingExperienceDescription'
    this.passedShowingExperienceDescription = this.navParams.get('passingShowingExperienceDescription');
    
    // Assigning 'editShowingExperienceForm' form validation
    this.editShowingExperienceForm = this.formBuilder.group({
      showingExperience: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.editShowingExperienceForm.patchValue({
      showingExperience: this.passedShowingExperience,
      description: this.passedShowingExperienceDescription
    });

  }

  // Implementation to close 'Edit Showing Experience' modal and pass experience update status
  async closeEditShowingExperienceModal(){
    await this.modalController.dismiss(this.editShowingExperienceStatus);
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

  // Function - Editing showing experiences details into the database by passing through the server-side application
  editShowingExperienceDetails(experienceDetailsFormValue: ShowingExperience){

    // Checking whether any details were updated from the existing details
    if(this.passedShowingExperience != experienceDetailsFormValue.showingExperience || 
      this.passedShowingExperienceDescription != experienceDetailsFormValue.description){

        // Assigning 'loadingSpinnerEditShowingExperience' to true (starts loading spinner)
        this.loadingSpinnerEditShowingExperience = true;

        // Disabling form submit
        this.editShowingExperienceForm.invalid;

        let updatedShowingExperience = {
          showingExperienceId: this.passedShowingExperienceId,
          showingExperience: experienceDetailsFormValue.showingExperience,
          showingExperienceDescription: experienceDetailsFormValue.description,
        }
    
        // Editing showing experience
        this.managerService.editShowingExperience(updatedShowingExperience)
          .subscribe((responseShowingExperience: any) => {
    
          if(responseShowingExperience.message == "Showing experience updated"){
    
            // Assigning 'loadingSpinnerEditShowingExperience' to false (stops loading spinner)
            this.loadingSpinnerEditShowingExperience = false;
    
            // Showing success message box to the user
            this.alertNotice("Showing Experience updated", "Showing experience was successfully updated.");
    
            console.log("Showing Experience Updated");
    
            // Updating 'editShowingExperienceStatus' to true
            this.editShowingExperienceStatus = true;
    
            // Enabling form submit
            this.editShowingExperienceForm.valid;
    
          }
          else if(responseShowingExperience.message == "Unable to update showing experience"){
    
            // Assigning 'loadingSpinnerEditShowingExperience' to false (stops loading spinner)
            this.loadingSpinnerEditShowingExperience = false;
    
            // Showing error message box to the user
            this.alertNotice("ERROR", "Unable to edit showing experience, apologies for the inconvenience. Please contact administrator.");
    
            console.log("Unable to edit showing experience");
    
            // Updating 'editShowingExperienceStatus' to false
            this.editShowingExperienceStatus = false;
    
            // Enabling form submit
            this.editShowingExperienceForm.valid;
    
          }
    
        }, (error: ErrorEvent) => {
          // Assigning 'loadingSpinnerEditShowingExperience' to false (stops loading spinner)
          this.loadingSpinnerEditShowingExperience = false;
    
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to edit showing experience, apologies for the inconvenience. Please contact administrator.");
    
          console.log("Unable to edit showing experience");
    
          // Updating 'editShowingExperienceStatus' to false
          this.editShowingExperienceStatus = false;
    
          // Enabling form submit
          this.editShowingExperienceForm.valid;
        });

      }
      else{

        // Showing information message box to the user
        this.alertNotice("Details Not Updated", "Showing Experience details are not updated.");
    
        console.log("Details are not updated.");

      }

  }

}
