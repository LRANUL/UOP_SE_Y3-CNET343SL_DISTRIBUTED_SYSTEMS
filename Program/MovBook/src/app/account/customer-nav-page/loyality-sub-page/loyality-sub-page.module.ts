import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyalitySubPagePageRoutingModule } from './loyality-sub-page-routing.module';

import { LoyalitySubPagePage } from './loyality-sub-page.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoyalitySubPagePageRoutingModule
  ],
  declarations: [LoyalitySubPagePage, HeaderComponent]
})
export class LoyalitySubPagePageModule {}
