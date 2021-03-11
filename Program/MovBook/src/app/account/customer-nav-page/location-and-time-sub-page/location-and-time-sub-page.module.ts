import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationAndTimeSubPagePageRoutingModule } from './location-and-time-sub-page-routing.module';

import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationAndTimeSubPagePageRoutingModule
  ],
  declarations: [LocationAndTimeSubPagePage]
})
export class LocationAndTimeSubPagePageModule {}
