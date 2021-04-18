import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieBookingSubPagePageRoutingModule } from './movie-booking-sub-page-routing.module';
import { LocationAndTimeSubPagePage } from '../location-and-time-sub-page/location-and-time-sub-page.page';
import { BookingSubPagePage } from '../booking-sub-page/booking-sub-page.page';

import { MovieBookingSubPagePage } from './movie-booking-sub-page.page';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieBookingSubPagePageRoutingModule,
    NgxStripeModule.forRoot('pk_test_51IEFJWJcuxwrCkGRQaDQ8ycbMSxyrsApmMnXmb9Zlnvo3rcws57a5fRf8gdD6n1meV9yH8KctT2OUbN8kfRka2hi00T1GM5O0W')
  ],
  declarations: [MovieBookingSubPagePage, LocationAndTimeSubPagePage, BookingSubPagePage],
  entryComponents: [LocationAndTimeSubPagePage, BookingSubPagePage, MovieBookingSubPagePage],
})
export class MovieBookingSubPagePageModule { }
