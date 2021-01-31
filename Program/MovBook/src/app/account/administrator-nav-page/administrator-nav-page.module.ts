import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorNavPagePageRoutingModule } from './administrator-nav-page-routing.module';

import { AdministratorNavPagePage } from './administrator-nav-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorNavPagePageRoutingModule
  ],
  declarations: [AdministratorNavPagePage]
})
export class AdministratorNavPagePageModule {}
