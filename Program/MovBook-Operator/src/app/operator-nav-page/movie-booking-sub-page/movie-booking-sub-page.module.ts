import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieBookingSubPagePageRoutingModule } from './movie-booking-sub-page-routing.module';

import { MovieBookingSubPagePage } from './movie-booking-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieBookingSubPagePageRoutingModule
  ],
  declarations: [MovieBookingSubPagePage]
})
export class MovieBookingSubPagePageModule {}
