import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailSubPagePageRoutingModule } from './movie-detail-sub-page-routing.module';

import { MovieDetailSubPagePage } from './movie-detail-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailSubPagePageRoutingModule
  ],
  declarations: [MovieDetailSubPagePage]
})
export class MovieDetailSubPagePageModule {}
