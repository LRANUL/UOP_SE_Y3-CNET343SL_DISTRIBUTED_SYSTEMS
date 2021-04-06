import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsHallsSubPagePageRoutingModule } from './locations-halls-sub-page-routing.module';

import { LocationsHallsSubPagePage } from './locations-halls-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsHallsSubPagePageRoutingModule
  ],
  declarations: [LocationsHallsSubPagePage]
})
export class LocationsHallsSubPagePageModule {}
