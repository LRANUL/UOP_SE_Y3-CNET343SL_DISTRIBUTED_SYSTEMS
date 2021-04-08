import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
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
  addNewLocationDetails(experienceDetailsFormValue){

    // Disabling form submit
    this.addNewShowingExperienceForm.invalid;

    this.managerService.addNewShowingExperience(experienceDetailsFormValue).subscribe((res) => {

      // // Updating 'addNewCinemaLocationStatus' to true
      // this.addNewCinemaLocationStatus = true;

      // // Showing success message box to user
      // this.alertNotice("Added", "New Cinema Location Successfully Added");

      // //alert("New Cinema Location Successfully Added");

      // // Enabling form submit
      // this.addNewLocationForm.valid;

      // // Closing AddLocationModal modal
      // this.closeAddLocationModal();

    }, (error: ErrorEvent) => {

      // // Updating 'addNewCinemaLocationStatus' to false
      // this.addNewCinemaLocationStatus = false;

      // // Showing error message box to user
      // this.alertNotice("ERROR", "Unable to add New Cinema Location");

      // //alert("Unable to add New Cinema Location");

      // // Enabling form submit
      // this.addNewLocationForm.valid;
    });

  }

}
