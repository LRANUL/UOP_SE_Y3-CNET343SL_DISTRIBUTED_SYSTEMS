import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyalitySubPagePageRoutingModule } from './loyality-sub-page-routing.module';

import { LoyalitySubPagePage } from './loyality-sub-page.page';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoyalitySubPagePageRoutingModule
  ],
  declarations: [LoyalitySubPagePage, HeaderComponentComponent]
})
export class LoyalitySubPagePageModule {}
