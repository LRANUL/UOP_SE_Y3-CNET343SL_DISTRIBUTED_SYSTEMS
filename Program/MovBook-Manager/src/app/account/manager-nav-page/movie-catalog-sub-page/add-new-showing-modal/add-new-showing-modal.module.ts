import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AddNewShowingModalPageRoutingModule } from './add-new-showing-modal-routing.module';
import { AddNewShowingModalPage } from './add-new-showing-modal.page';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewShowingModalPageRoutingModule,
    AngularMaterialModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [AddNewShowingModalPage]
})
export class AddNewShowingModalPageModule {}
