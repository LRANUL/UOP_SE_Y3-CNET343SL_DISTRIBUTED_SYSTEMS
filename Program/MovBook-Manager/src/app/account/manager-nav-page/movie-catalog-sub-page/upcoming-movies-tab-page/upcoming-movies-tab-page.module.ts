import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingMoviesTabPagePageRoutingModule } from './upcoming-movies-tab-page-routing.module';

import { UpcomingMoviesTabPagePage } from './upcoming-movies-tab-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingMoviesTabPagePageRoutingModule
  ],
  declarations: [UpcomingMoviesTabPagePage]
})
export class UpcomingMoviesTabPagePageModule {}
