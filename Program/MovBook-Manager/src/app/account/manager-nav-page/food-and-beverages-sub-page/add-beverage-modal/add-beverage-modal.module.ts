import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBeverageModalPageRoutingModule } from './add-beverage-modal-routing.module';

import { AddBeverageModalPage } from './add-beverage-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddBeverageModalPageRoutingModule
  ],
  declarations: [AddBeverageModalPage]
})
export class AddBeverageModalPageModule {}
