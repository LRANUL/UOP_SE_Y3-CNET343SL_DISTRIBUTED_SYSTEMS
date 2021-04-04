import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieWaitlistTabPagePageRoutingModule } from './movie-waitlist-tab-page-routing.module';

import { MovieWaitlistTabPagePage } from './movie-waitlist-tab-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieWaitlistTabPagePageRoutingModule
  ],
  declarations: [MovieWaitlistTabPagePage]
})
export class MovieWaitlistTabPagePageModule {}
