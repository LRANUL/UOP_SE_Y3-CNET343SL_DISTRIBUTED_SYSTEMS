import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminPageRoutingModule } from './edit-admin-routing.module';

import { EditAdminPage } from './edit-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditAdminPage]
})
export class EditAdminPageModule {}
