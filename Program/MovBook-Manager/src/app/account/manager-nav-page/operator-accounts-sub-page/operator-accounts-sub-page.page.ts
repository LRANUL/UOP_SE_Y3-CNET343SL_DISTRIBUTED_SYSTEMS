import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.page';
import { RegisterOperatorAccountModalPage } from './register-operator-account-modal/register-operator-account-modal.page';
let operatorEmail
@Component({
  selector: 'app-operator-accounts-sub-page',
  templateUrl: './operator-accounts-sub-page.page.html',
  styleUrls: ['./operator-accounts-sub-page.page.scss'],
})
export class OperatorAccountsSubPagePage implements OnInit {

  // Declaration - FormGroup to collect user preferences to search operator account
  searchOperatorAccountForm: FormGroup;

  // TEMPORARY Declaration - Handle section visibility
  operatorAccountDetails = {
    operatorAccountView: "Initial", // Initial, Found and NotAvailable
    operatorAccountStatus: "null" // Disabled, Enabled and null
  };
  Name: string;
  Email: any;
  Phone: any;
  Address: string;
  RegisteredDateTime: any;

  constructor(
    private managerService: ManagerService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    // Assigning 'searchOperatorAccountForm' form validation
    this.searchOperatorAccountForm = this.formBuilder.group({
      emailAddress: new FormControl('', Validators.required),
      namePrefix: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }
  // Function - Implementation for opening the 'Register Operator Account' modal
  async openRegisterOperatorAccountModal(accountDetails: any) {
    const registerOperatorAccountModal = await this.modalController.create({
      component: RegisterOperatorAccountModalPage,
      cssClass: 'update-account-details-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    registerOperatorAccountModal.present();
  }

  getformEmail(searchOperatorAccountForm) {
    operatorEmail = searchOperatorAccountForm.emailAddress
    if (searchOperatorAccountForm.emailAddress != '') {
      this.doSearchOperatorAccount(operatorEmail)
    }
    else if (searchOperatorAccountForm.emailAddress == '') {
      this.doSearchOperatorAccountByDetails(searchOperatorAccountForm)
    }
  }
  doSearchOperatorAccountByDetails(searchOperatorAccountForm) {
    this.managerService.getOperatorByDetails(searchOperatorAccountForm).subscribe(
      (data) => {
        console.log(data)
        if (data['length'] == 0) {
          this.operatorAccountDetails.operatorAccountView = 'NotAvailable';
          this.operatorAccountDetails.operatorAccountStatus = 'null'
        }
        else {
          this.operatorAccountDetails.operatorAccountView = 'Found';
          var details = data['0']
          this.Name = details['name']['prefix'] + '. ' + details['name']['firstName'] + ' ' + details['name']['lastName'];
          this.Email = details['emailAddress'];
          this.Phone = details['phoneNumber'];
          this.Address = details['address']['streetAddress'] + ', ' + details['address']['city'] + ', ' + details['address']['postalZipCode']
          this.RegisteredDateTime = details['registeredDateTime'];
          this.operatorAccountDetails.operatorAccountStatus = details['accountStatus']
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  doSearchOperatorAccount(operatorEmail) {
    console.log(operatorEmail)
    this.managerService.getOperator(operatorEmail).subscribe(
      (data) => {
        console.log(data)
        if (data['length'] == 0) {
          this.operatorAccountDetails.operatorAccountView = 'NotAvailable';
          this.operatorAccountDetails.operatorAccountStatus = 'null'

        }
        else {
          this.operatorAccountDetails.operatorAccountView = 'Found';
          var details = data['0']
          this.Name = details['name']['prefix'] + '. ' + details['name']['firstName'] + ' ' + details['name']['lastName'];
          this.Email = details['emailAddress'];
          this.Phone = details['phoneNumber'];
          this.Address = details['address']['streetAddress'] + ', ' + details['address']['city'] + ', ' + details['address']['postalZipCode']
          this.RegisteredDateTime = details['registeredDateTime'];
          this.operatorAccountDetails.operatorAccountStatus = details['accountStatus']
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  accountStatusUpdate() {
    var getStatus = this.operatorAccountDetails.operatorAccountStatus
    var setStatus;
    if (getStatus == 'Enabled') {
      setStatus = 'Disabled';
      console.log('Disabled R')
      this.managerService.setOperatorAccountStatus(operatorEmail, setStatus).subscribe(
        (data) => {
          console.log(data)
          this.doSearchOperatorAccount(operatorEmail)
        },
        (error) => {
          console.log(error);
        }
      );

    }
    else if (getStatus == 'Disabled') {
      setStatus = 'Enabled';
      console.log('Enabled R')
      this.managerService.setOperatorAccountStatus(operatorEmail, setStatus).subscribe(
        (data) => {
          console.log(data)
          this.doSearchOperatorAccount(operatorEmail)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
