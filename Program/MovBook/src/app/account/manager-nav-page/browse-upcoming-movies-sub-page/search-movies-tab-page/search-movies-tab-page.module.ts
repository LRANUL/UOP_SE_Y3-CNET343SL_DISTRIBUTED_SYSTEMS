import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoviesTabPagePageRoutingModule } from './search-movies-tab-page-routing.module';

import { SearchMoviesTabPagePage } from './search-movies-tab-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoviesTabPagePageRoutingModule
  ],
  declarations: [SearchMoviesTabPagePage]
})
export class SearchMoviesTabPagePageModule {}
