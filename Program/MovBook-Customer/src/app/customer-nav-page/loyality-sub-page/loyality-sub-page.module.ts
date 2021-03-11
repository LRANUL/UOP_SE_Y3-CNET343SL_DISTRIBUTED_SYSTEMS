import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyalitySubPagePageRoutingModule } from './loyality-sub-page-routing.module';

import { LoyalitySubPagePage } from './loyality-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoyalitySubPagePageRoutingModule
  ],
  declarations: [LoyalitySubPagePage]
})
export class LoyalitySubPagePageModule {}
