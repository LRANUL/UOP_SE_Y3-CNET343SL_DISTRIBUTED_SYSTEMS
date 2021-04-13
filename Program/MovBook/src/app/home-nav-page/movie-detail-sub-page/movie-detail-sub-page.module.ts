import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailSubPagePageRoutingModule } from './movie-detail-sub-page-routing.module';

import { MovieDetailSubPagePage } from './movie-detail-sub-page.page';
import { HeaderComponent } from 'src/app/account/customer-nav-page/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailSubPagePageRoutingModule
  ],
  declarations: [MovieDetailSubPagePage, HeaderComponent]
})
export class MovieDetailSubPagePageModule {}
