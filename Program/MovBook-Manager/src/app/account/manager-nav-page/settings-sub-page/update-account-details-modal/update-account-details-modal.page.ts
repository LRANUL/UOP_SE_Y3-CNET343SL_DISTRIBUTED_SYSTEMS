import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-update-account-details-modal',
  templateUrl: './update-account-details-modal.page.html',
  styleUrls: ['./update-account-details-modal.page.scss'],
})
export class UpdateAccountDetailsModalPage implements OnInit {

  // Declaration - FormGroup to handle updateAccountDetailsForm form
  updateAccountDetailsForm: FormGroup;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning 'updateAccountDetailsForm' form validation
    this.updateAccountDetailsForm = this.formBuilder.group({
      namePrefix: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      addressCity: new FormControl('', Validators.required),
      addressPostalCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Update Account Details' modal
  async closeUpdateAccountDetailsModal(){
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

}
