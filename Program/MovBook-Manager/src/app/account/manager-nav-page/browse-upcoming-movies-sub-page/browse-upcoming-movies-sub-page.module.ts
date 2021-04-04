import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseUpcomingMoviesSubPagePageRoutingModule } from './browse-upcoming-movies-sub-page-routing.module';

import { BrowseUpcomingMoviesSubPagePage } from './browse-upcoming-movies-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseUpcomingMoviesSubPagePageRoutingModule
  ],
  declarations: [BrowseUpcomingMoviesSubPagePage]
})
export class BrowseUpcomingMoviesSubPagePageModule {}
