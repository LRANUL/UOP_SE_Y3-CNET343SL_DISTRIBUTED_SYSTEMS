import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutUsSubPagePageRoutingModule } from './about-us-sub-page-routing.module';

import { AboutUsSubPagePage } from './about-us-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsSubPagePageRoutingModule
  ],
  declarations: [AboutUsSubPagePage]
})
export class AboutUsSubPagePageModule {}
