import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewShowingExperienceModalPageRoutingModule } from './add-new-showing-experience-modal-routing.module';

import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewShowingExperienceModalPageRoutingModule
  ],
  declarations: [AddNewShowingExperienceModalPage]
})
export class AddNewShowingExperienceModalPageModule {}
