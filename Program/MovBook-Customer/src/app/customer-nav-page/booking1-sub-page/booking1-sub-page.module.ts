import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Booking1SubPagePageRoutingModule } from './booking1-sub-page-routing.module';

import { Booking1SubPagePage } from './booking1-sub-page.page';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';
import { PaymentPage } from '../payment/payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Booking1SubPagePageRoutingModule
  ],
  declarations: [Booking1SubPagePage, HeaderComponentComponent,PaymentPage]
})
export class Booking1SubPagePageModule {}
