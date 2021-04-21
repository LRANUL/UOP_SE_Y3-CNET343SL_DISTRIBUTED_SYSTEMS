import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {

  // Declaration - FormGroup to handle changePasswordForm form
  changePasswordForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning 'changePasswordForm' form validation
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmMewPassword: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Change Password' modal
  async closeChangePasswordModal() {
    await this.modalController.dismiss();
  }

  // Function - Update password details
  changePasswordDetails() {

  }

}
