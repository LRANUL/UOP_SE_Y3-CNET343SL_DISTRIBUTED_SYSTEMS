import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CinemaHallsSubPagePageRoutingModule } from './cinema-halls-sub-page-routing.module';

import { CinemaHallsSubPagePage } from './cinema-halls-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CinemaHallsSubPagePageRoutingModule
  ],
  declarations: [CinemaHallsSubPagePage]
})
export class CinemaHallsSubPagePageModule {}
