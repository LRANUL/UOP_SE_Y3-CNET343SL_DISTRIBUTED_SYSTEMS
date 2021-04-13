import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOperatorAccountModalPageRoutingModule } from './register-operator-account-modal-routing.module';

import { RegisterOperatorAccountModalPage } from './register-operator-account-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterOperatorAccountModalPageRoutingModule
  ],
  declarations: [RegisterOperatorAccountModalPage]
})
export class RegisterOperatorAccountModalPageModule {}
