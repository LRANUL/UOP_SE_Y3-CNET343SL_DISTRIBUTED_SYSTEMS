import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyalityInformationSubPagePageRoutingModule } from './loyality-information-sub-page-routing.module';

import { LoyalityInformationSubPagePage } from './loyality-information-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoyalityInformationSubPagePageRoutingModule
  ],
  declarations: [LoyalityInformationSubPagePage]
})
export class LoyalityInformationSubPagePageModule {}
