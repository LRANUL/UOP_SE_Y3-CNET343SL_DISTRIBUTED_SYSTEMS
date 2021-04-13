import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutUsSubPagePageRoutingModule } from './about-us-sub-page-routing.module';

import { AboutUsSubPagePage } from './about-us-sub-page.page';
import { HeaderComponent } from 'src/app/account/customer-nav-page/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsSubPagePageRoutingModule
  ],
  declarations: [AboutUsSubPagePage, HeaderComponent]
})
export class AboutUsSubPagePageModule {}
