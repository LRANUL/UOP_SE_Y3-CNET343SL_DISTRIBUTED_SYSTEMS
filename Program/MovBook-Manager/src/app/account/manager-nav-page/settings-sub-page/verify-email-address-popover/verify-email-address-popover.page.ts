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
  verifyEmailAddressForm: FormGroup;

  // Declaration | Initialization - string variable to store passingEmailVerificationObjectId
  passedEmailVerificationObjectId: String = null;

  // Declaration | Initialization - to store the status of verifying the pin code
  pinCodeVerificationStatus: Boolean;

  // Declaration | Initialization - To handle the visibility of the 'loadingSpinnerPinCodeVerification' spinner
  loadingSpinnerPinCodeVerification: Boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private managerService: ManagerService,
    private navParams: NavParams,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Assigning variable with passed 'passingEmailVerificationObjectId'
    this.passedEmailVerificationObjectId = this.navParams.get('passingEmailVerificationObjectId');

    // Assigning 'verifyEmailAddressForm' form validation
    this.verifyEmailAddressForm = this.formBuilder.group({
      pinCode: new FormControl('', Validators.required)
    });

  }


  // Implementation to close 'Verify Email Address' popover
  async closeVerifyEmailAddressPopover(){
    await this.popoverController.dismiss(this.pinCodeVerificationStatus);
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


  // Function - Pin Code Verification Success Alert Box Implementation
  async pinCodeSuccessAlertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Closing 'Verify Email Address' popover
          this.closeVerifyEmailAddressPopover();
        }
      }]
    });
    await alert.present();
  }


  // Function - Checking the validity of the enter pin code
  doVerifyEmailAddress(verifyEmailAddressFormData){

    // Assigning 'loadingSpinnerPinCodeVerification' to true (starts loading spinner)
    this.loadingSpinnerPinCodeVerification = true;

    // Disabling form submit
    this.verifyEmailAddressForm.invalid;
  
    // Verifying verification pin code
    this.managerService.verifyVerificationPinCode(this.passedEmailVerificationObjectId, verifyEmailAddressFormData.pinCode)
      .subscribe((verificationResponse: any) => {

      if(verificationResponse.message == "Email Address Verified"){
        // Assigning 'loadingSpinnerPinCodeVerification' to false (stops loading spinner)
        this.loadingSpinnerPinCodeVerification = false;

        this.pinCodeVerificationStatus = true;

        // Showing success message box to the user
        this.pinCodeSuccessAlertNotice("Verified", "Email address is verified");

        // Enabling form submit
        this.verifyEmailAddressForm.valid;
      }
      else {
        // Assigning 'loadingSpinnerPinCodeVerification' to false (stops loading spinner)
        this.loadingSpinnerPinCodeVerification = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", verificationResponse.message);

        console.log("Error: ", verificationResponse.message);

        // Enabling form submit
        this.verifyEmailAddressForm.valid;
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerPinCodeVerification' to false (stops loading spinner)
      this.loadingSpinnerPinCodeVerification = false;

      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to verify pin code, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to verify pin code: ", error);

      // Enabling form submit
      this.verifyEmailAddressForm.valid;
    });
  }


}
