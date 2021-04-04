import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHallModalPageRoutingModule } from './add-hall-modal-routing.module';

import { AddHallModalPage } from './add-hall-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddHallModalPageRoutingModule
  ],
  declarations: [AddHallModalPage]
})
export class AddHallModalPageModule {}
