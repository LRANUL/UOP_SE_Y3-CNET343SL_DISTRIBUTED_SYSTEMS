import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPage } from './payment.page';
import { NgxStripeModule } from 'ngx-stripe';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxStripeModule.forRoot('pk_test_51IEFJWJcuxwrCkGRQaDQ8ycbMSxyrsApmMnXmb9Zlnvo3rcws57a5fRf8gdD6n1meV9yH8KctT2OUbN8kfRka2hi00T1GM5O0W')
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
