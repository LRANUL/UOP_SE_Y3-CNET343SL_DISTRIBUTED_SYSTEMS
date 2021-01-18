import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerRegistrationModalPageRoutingModule } from './customer-registration-modal-routing.module';

import { CustomerRegistrationModalPage } from './customer-registration-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerRegistrationModalPageRoutingModule
  ],
  declarations: [CustomerRegistrationModalPage]
})
export class CustomerRegistrationModalPageModule {}
