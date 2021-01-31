import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesSubPagePageRoutingModule } from './movies-sub-page-routing.module';

import { MoviesSubPagePage } from './movies-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesSubPagePageRoutingModule
  ],
  declarations: [MoviesSubPagePage]
})
export class MoviesSubPagePageModule {}
