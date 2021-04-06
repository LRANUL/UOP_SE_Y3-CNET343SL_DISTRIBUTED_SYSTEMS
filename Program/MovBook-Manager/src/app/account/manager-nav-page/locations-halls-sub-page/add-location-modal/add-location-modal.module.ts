import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLocationModalPageRoutingModule } from './add-location-modal-routing.module';

import { AddLocationModalPage } from './add-location-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddLocationModalPageRoutingModule
  ],
  declarations: [AddLocationModalPage]
})
export class AddLocationModalPageModule {}
