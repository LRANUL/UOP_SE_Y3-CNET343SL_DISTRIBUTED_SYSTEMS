import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeNavPagePageRoutingModule } from './home-nav-page-routing.module';

import { HomeNavPagePage } from './home-nav-page.page';
import { HeaderComponent } from '../account/customer-nav-page/header/header.component';
import { FooterComponent } from '../account/customer-nav-page/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeNavPagePageRoutingModule
  ],
  declarations: [HomeNavPagePage, HeaderComponent, FooterComponent]
})
export class HomeNavPagePageModule {}
