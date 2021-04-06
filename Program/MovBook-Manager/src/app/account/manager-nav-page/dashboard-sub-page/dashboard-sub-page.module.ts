import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardSubPagePageRoutingModule } from './dashboard-sub-page-routing.module';

import { DashboardSubPagePage } from './dashboard-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardSubPagePageRoutingModule
  ],
  declarations: [DashboardSubPagePage]
})
export class DashboardSubPagePageModule {}
