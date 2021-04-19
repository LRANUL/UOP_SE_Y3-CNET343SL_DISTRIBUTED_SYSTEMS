import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, PopoverController, NavParams } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { ChangePasswordModalPage } from '../change-password-modal/change-password-modal.page';
import { VerifyEmailAddressPopoverPage } from '../verify-email-address-popover/verify-email-address-popover.page';

@Component({
  selector: 'app-update-account-details-modal',
  templateUrl: './update-account-details-modal.page.html',
  styleUrls: ['./update-account-details-modal.page.scss'],
})
export class UpdateAccountDetailsModalPage implements OnInit {

  // Declaration - FormGroup to handle updateAccountDetailsForm form
  updateAccountDetailsForm: FormGroup;

  // Declaration | Initialization - string variable to store passingEnteredEmailAddress
  passedEmailAddress = null;

  // Declaration - Stores the newly entered email address
  formEmailAddress: String = "";

  // Declaration | Initialization - To handle the visibility of the 'loadingSpinnerVerifyNewEmail' spinner
  loadingSpinnerVerifyNewEmail: Boolean = false;

  // Declaration - To handle the visibility of the verification response icons
  newEmailVerificationSuccess: Boolean;

  // Declaration - To handle the text of the 'VERIFY' button
  verifyButtonText: String = "VERIFY";

  // Declaration | Initialization - To handle the visibility of the 'Enter Pin Code' button
  enterPinCodeButton: Boolean = false;
  
  // Declaration | Initialization - To store the created emailVerificationObjectId
  activeEmailVerificationObjectId: String = "";
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    // Assigning variable with passed 'passingEmailAddress'
    this.passedEmailAddress = this.navParams.get('passingEmailAddress');

    // Assigning 'updateAccountDetailsForm' form validation
    this.updateAccountDetailsForm = this.formBuilder.group({
      namePrefix: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      addressCity: new FormControl('', Validators.required),
      addressPostalCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required)
    });

  }

  // Implementation to close 'Update Account Details' modal
  async closeUpdateAccountDetailsModal(){
    await this.modalController.dismiss();
  }

  // Setter to store entered email address
  setFormEmailAddress(enteredEmailAddress: String){
    this.formEmailAddress = enteredEmailAddress;
  }

  // Implementation for opening the 'Verify Email Address' popover
  async openVerifyEmailAddressPopover(evt: Event){
    const VerifyEmailAddressPopover = await this.popoverController.create({
      component: VerifyEmailAddressPopoverPage,
      event: evt,
      componentProps: {
        passingEmailVerificationObjectId: this.activeEmailVerificationObjectId
      }
    });console.log(this.activeEmailVerificationObjectId);
    VerifyEmailAddressPopover.present();

    // Collecting response data when popover is dismissed
    const { data } = await VerifyEmailAddressPopover.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data'
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Renaming 'RESEND' button to 'VERIFIED'
        this.verifyButtonText = "VERIFIED";

        // Hiding visibility to the 'ENTER PIN CODE' button
        this.enterPinCodeButton = false;

        // Showing the verified icon to the user
        this.newEmailVerificationSuccess = true;
      }
      else{
        // Showing the invalid email icon to the user
        this.newEmailVerificationSuccess = false;
      }
    }
  }

  // Function - Implementation for opening the 'Change Password' modal
  async openChangePasswordModal(){
    this.closeUpdateAccountDetailsModal();
    const addNewShowingExperienceModal = await this.modalController.create({
      component: ChangePasswordModalPage,
      cssClass: 'add-new-showing-experience-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addNewShowingExperienceModal.present();
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


  // Confirm Box Implementation - Email Verification
  async confirmBoxEmailVerification (title: string, content: string, clickEvent: any) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Confirm Box: Request denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Confirm Box: Request accepted");

            // Sending email to the entered email address
            this.sendEmailForEmailVerification(clickEvent);
          }
        }
      ]
    });
    await alert.present();
  }


  // Function - Email Address Verification Email Send Success Alert Box Implementation
  async emailVerificationAlertNotice (title: string, content: string, clickEvent) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Opening verify email address popover (to enter verification pin code)
          this.openVerifyEmailAddressPopover(clickEvent);
        }
      }]
    });
    await alert.present();
  }


  // Function - Sending details to the server-side application to commend on sending verification pin code
  sendEmailForEmailVerification(clickEvent: any){

    // Checking whether the email address field has been populated
    if(this.formEmailAddress == ""){
      this.alertNotice("Email Missing", "Provide new email address to continue.");
    }
    // Cross checking enter email address with the email address from local storage
    else if(this.formEmailAddress == this.passedEmailAddress){
      this.alertNotice("Not Updated", "Provide new email address to continue.");
    }
    else{

      // Assigning 'loadingSpinnerVerifyNewEmail' to true (starts loading spinner)
      this.loadingSpinnerVerifyNewEmail = true;

      // Disabling form submit
      this.updateAccountDetailsForm.invalid;

      // Cross checking enter email address with the email address from local storage
      let loggedInLoginObjectId = localStorage.getItem('loginId');
    
      // Verifying new email address
      this.managerService.verifyEmailAddress(loggedInLoginObjectId, this.formEmailAddress)
        .subscribe((verificationResponse: any) => {

        if(verificationResponse.message == "Email verification created"){
          // Assigning 'loadingSpinnerVerifyNewEmail' to false (stops loading spinner)
          this.loadingSpinnerVerifyNewEmail = false;

          // Renaming 'VERIFY' button to 'RESEND'
          this.verifyButtonText = "RESEND";

          // Assigning newly generated emailVerificationObjectId
          this.activeEmailVerificationObjectId = verificationResponse.returnedData._id;

          // Enabling visibility to the 'ENTER PIN CODE' button
          this.enterPinCodeButton = true;

          // Showing success message box to the user
          this.emailVerificationAlertNotice("Email Sent", "Verification pin code has been sent.", clickEvent);

          // Enabling form submit
          this.updateAccountDetailsForm.valid;
        }
        else if(verificationResponse.message == "Unable to create email verification"){
          // Assigning 'loadingSpinnerVerifyNewEmail' to false (stops loading spinner)
          this.loadingSpinnerVerifyNewEmail = false;
  
          // Showing error message box to the user
          this.alertNotice("ERROR", "Unable to send verification email, apologies for the inconvenience. Please contact administrator.");
  
          console.log("Unable to send verification email");
  
          // Enabling form submit
          this.updateAccountDetailsForm.valid;
        }
  
      }, (error: ErrorEvent) => {
        // Assigning 'loadingSpinnerVerifyNewEmail' to false (stops loading spinner)
        this.loadingSpinnerVerifyNewEmail = false;
  
        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to send verification email, apologies for the inconvenience. Please contact administrator.");
  
        console.log("Unable to send verification email");
  
        // Enabling form submit
        this.updateAccountDetailsForm.valid;
      });
    }
  }


}
