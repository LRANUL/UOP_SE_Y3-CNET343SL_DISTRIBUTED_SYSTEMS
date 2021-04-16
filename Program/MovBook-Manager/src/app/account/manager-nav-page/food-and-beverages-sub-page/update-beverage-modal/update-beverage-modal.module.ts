import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBeverageModalPageRoutingModule } from './update-beverage-modal-routing.module';

import { UpdateBeverageModalPage } from './update-beverage-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateBeverageModalPageRoutingModule
  ],
  declarations: [UpdateBeverageModalPage]
})
export class UpdateBeverageModalPageModule {}
