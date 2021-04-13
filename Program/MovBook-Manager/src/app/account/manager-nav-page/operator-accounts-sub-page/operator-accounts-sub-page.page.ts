import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.page';
import { RegisterOperatorAccountModalPage } from './register-operator-account-modal/register-operator-account-modal.page';

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
  async openRegisterOperatorAccountModal(accountDetails: any){
    const registerOperatorAccountModal = await this.modalController.create({
      component: RegisterOperatorAccountModalPage,
      cssClass: 'update-account-details-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    registerOperatorAccountModal.present();
  }

}
