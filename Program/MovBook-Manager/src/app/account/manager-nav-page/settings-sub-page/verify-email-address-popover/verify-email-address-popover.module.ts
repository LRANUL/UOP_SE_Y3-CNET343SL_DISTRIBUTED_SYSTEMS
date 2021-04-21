import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailAddressPopoverPageRoutingModule } from './verify-email-address-popover-routing.module';

import { VerifyEmailAddressPopoverPage } from './verify-email-address-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerifyEmailAddressPopoverPageRoutingModule
  ],
  declarations: [VerifyEmailAddressPopoverPage]
})
export class VerifyEmailAddressPopoverPageModule {}
