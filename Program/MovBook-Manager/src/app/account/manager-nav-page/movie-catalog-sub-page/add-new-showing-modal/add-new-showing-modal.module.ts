import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewShowingModalPageRoutingModule } from './add-new-showing-modal-routing.module';

import { AddNewShowingModalPage } from './add-new-showing-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewShowingModalPageRoutingModule
  ],
  declarations: [AddNewShowingModalPage]
})
export class AddNewShowingModalPageModule {}
