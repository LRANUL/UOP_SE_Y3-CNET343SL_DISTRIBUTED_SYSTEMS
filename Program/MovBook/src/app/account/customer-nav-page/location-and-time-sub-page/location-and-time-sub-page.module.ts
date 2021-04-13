import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationAndTimeSubPagePageRoutingModule } from './location-and-time-sub-page-routing.module';

import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';
import { HeaderComponent } from '../header/header.component';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationAndTimeSubPagePageRoutingModule,
    TooltipsModule
  ],
  declarations: [LocationAndTimeSubPagePage, HeaderComponent]
})
export class LocationAndTimeSubPagePageModule {}
