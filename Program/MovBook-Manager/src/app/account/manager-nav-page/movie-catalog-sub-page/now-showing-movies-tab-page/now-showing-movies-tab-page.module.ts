import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NowShowingMoviesTabPagePageRoutingModule } from './now-showing-movies-tab-page-routing.module';

import { NowShowingMoviesTabPagePage } from './now-showing-movies-tab-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NowShowingMoviesTabPagePageRoutingModule
  ],
  declarations: [NowShowingMoviesTabPagePage]
})
export class NowShowingMoviesTabPagePageModule {}
