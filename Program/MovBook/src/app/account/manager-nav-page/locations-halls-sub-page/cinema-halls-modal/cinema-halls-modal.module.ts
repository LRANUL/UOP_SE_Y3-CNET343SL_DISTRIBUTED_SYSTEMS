import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CinemaHallsModalPageRoutingModule } from './cinema-halls-modal-routing.module';

import { CinemaHallsModalPage } from './cinema-halls-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CinemaHallsModalPageRoutingModule
  ],
  declarations: [CinemaHallsModalPage]
})
export class CinemaHallsModalPageModule {}
