import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationAndTimeSubPagePageRoutingModule } from './location-and-time-sub-page-routing.module';

import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationAndTimeSubPagePageRoutingModule
  ],
  declarations: [LocationAndTimeSubPagePage, HeaderComponentComponent]
})
export class LocationAndTimeSubPagePageModule {}
