import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLocationModalPageRoutingModule } from './edit-location-modal-routing.module';

import { EditLocationModalPage } from './edit-location-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditLocationModalPageRoutingModule
  ],
  declarations: [EditLocationModalPage]
})
export class EditLocationModalPageModule {}
