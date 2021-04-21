import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHallModalPageRoutingModule } from './edit-hall-modal-routing.module';

import { EditHallModalPage } from './edit-hall-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditHallModalPageRoutingModule
  ],
  declarations: [EditHallModalPage]
})
export class EditHallModalPageModule {}
