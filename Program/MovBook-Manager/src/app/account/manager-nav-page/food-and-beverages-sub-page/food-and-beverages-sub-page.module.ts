import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodAndBeveragesSubPagePageRoutingModule } from './food-and-beverages-sub-page-routing.module';

import { FoodAndBeveragesSubPagePage } from './food-and-beverages-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodAndBeveragesSubPagePageRoutingModule
  ],
  declarations: [FoodAndBeveragesSubPagePage]
})
export class FoodAndBeveragesSubPagePageModule {}
