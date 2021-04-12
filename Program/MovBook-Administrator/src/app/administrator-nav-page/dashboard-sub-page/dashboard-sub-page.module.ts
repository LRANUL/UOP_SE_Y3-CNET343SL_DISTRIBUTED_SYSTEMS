import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { DashboardSubPagePageRoutingModule } from './dashboard-sub-page-routing.module';

import { DashboardSubPagePage } from './dashboard-sub-page.page';
import { EmployeeService } from '../../services/account/employee.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardSubPagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [DashboardSubPagePage],
  providers: [EmployeeService],
})
export class DashboardSubPagePageModule {}
