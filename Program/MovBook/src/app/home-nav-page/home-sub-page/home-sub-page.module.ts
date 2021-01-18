import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSubPagePageRoutingModule } from './home-sub-page-routing.module';

import { HomeSubPagePage } from './home-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSubPagePageRoutingModule
  ],
  declarations: [HomeSubPagePage]
})
export class HomeSubPagePageModule {}
