import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorPageRoutingModule } from './administrator-routing.module';

import { AdministratorPage } from './administrator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorPageRoutingModule
  ],
  declarations: [AdministratorPage]
})
export class AdministratorPageModule {}
