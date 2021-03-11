import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsModalPageRoutingModule } from './movie-details-modal-routing.module';

import { MovieDetailsModalPage } from './movie-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsModalPageRoutingModule
  ],
  declarations: [MovieDetailsModalPage]
})
export class MovieDetailsModalPageModule {}
