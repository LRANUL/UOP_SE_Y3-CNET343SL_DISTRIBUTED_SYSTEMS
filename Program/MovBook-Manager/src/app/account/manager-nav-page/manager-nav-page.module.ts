import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerNavPagePageRoutingModule } from './manager-nav-page-routing.module';

import { ManagerNavPagePage } from './manager-nav-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerNavPagePageRoutingModule
  ],
  declarations: [ManagerNavPagePage]
})
export class ManagerNavPagePageModule {}
