import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { VerifyEmailAddressPopoverPage } from '../../settings-sub-page/verify-email-address-popover/verify-email-address-popover.page';

@Component({
  selector: 'app-register-operator-account-modal',
  templateUrl: './register-operator-account-modal.page.html',
  styleUrls: ['./register-operator-account-modal.page.scss'],
})
export class RegisterOperatorAccountModalPage implements OnInit {

  // Declaration - FormGroup to handle addAccountDetailsForm form
  addAccountDetailsForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Assigning 'addAccountDetailsForm' form validation
    this.addAccountDetailsForm = this.formBuilder.group({
      namePrefix: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      addressCity: new FormControl('', Validators.required),
      addressPostalCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Register Operator Account' modal
  async closeRegisterOperatorAccountModal(){
    await this.modalController.dismiss();
  }

  // Implementation for opening the 'Verify Email Address' popover
  async openVerifyEmailAddressPopover(evt: Event){
    const VerifyEmailAddressPopover = await this.popoverController.create({
      component: VerifyEmailAddressPopoverPage,
      event: evt
    });
    VerifyEmailAddressPopover.present();

    // Collecting response data when popover is dismissed
    const { data } = await VerifyEmailAddressPopover.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data'
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){



      }
    }
  }


}
