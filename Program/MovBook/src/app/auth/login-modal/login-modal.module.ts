import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginModalPageRoutingModule } from './login-modal-routing.module';

import { LoginModalPage } from './login-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginModalPage]
})
export class LoginModalPageModule {}
