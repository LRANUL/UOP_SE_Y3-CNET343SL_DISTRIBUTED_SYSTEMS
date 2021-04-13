import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, PopoverController, AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-verify-email-address-popover',
  templateUrl: './verify-email-address-popover.page.html',
  styleUrls: ['./verify-email-address-popover.page.scss'],
})
export class VerifyEmailAddressPopoverPage implements OnInit {
    
  // Declaration - FormGroup to collect new operator account details
  verifyEmailAddressForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private managerService: ManagerService,
  ) { }

  ngOnInit() {

    // Assigning 'verifyEmailAddressForm' form validation
    this.verifyEmailAddressForm = this.formBuilder.group({
      pinCode: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Movie Catalog Types' popover
  async closeVerifyEmailAddressPopover(){
    
    // REMOVE THE TWO COMMENTS BELOW AFTER REVIEWING
    // If needed to send data back when closing the popover 
    // await this.popoverController.dismiss(<ADD DATA HERE>);
    await this.popoverController.dismiss();
  }

}
