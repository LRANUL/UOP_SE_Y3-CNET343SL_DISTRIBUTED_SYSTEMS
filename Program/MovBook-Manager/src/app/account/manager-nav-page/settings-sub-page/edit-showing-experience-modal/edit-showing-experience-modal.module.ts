import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditShowingExperienceModalPageRoutingModule } from './edit-showing-experience-modal-routing.module';

import { EditShowingExperienceModalPage } from './edit-showing-experience-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditShowingExperienceModalPageRoutingModule
  ],
  declarations: [EditShowingExperienceModalPage]
})
export class EditShowingExperienceModalPageModule {}
