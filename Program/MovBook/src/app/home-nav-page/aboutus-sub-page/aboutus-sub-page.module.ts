import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutusSubPagePageRoutingModule } from './aboutus-sub-page-routing.module';

import { AboutusSubPagePage } from './aboutus-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutusSubPagePageRoutingModule
  ],
  declarations: [AboutusSubPagePage]
})
export class AboutusSubPagePageModule {}
