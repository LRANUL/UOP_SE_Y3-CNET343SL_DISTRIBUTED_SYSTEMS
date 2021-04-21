import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordModalPageRoutingModule } from './change-password-modal-routing.module';

import { ChangePasswordModalPage } from './change-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangePasswordModalPageRoutingModule
  ],
  declarations: [ChangePasswordModalPage]
})
export class ChangePasswordModalPageModule {}
