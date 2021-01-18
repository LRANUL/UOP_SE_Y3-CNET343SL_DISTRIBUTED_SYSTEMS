import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeNavPagePageRoutingModule } from './home-nav-page-routing.module';

import { HomeNavPagePage } from './home-nav-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeNavPagePageRoutingModule
  ],
  declarations: [HomeNavPagePage]
})
export class HomeNavPagePageModule {}
