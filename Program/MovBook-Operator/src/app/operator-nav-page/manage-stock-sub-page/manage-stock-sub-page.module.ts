import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageStockSubPagePageRoutingModule } from './manage-stock-sub-page-routing.module';

import { ManageStockSubPagePage } from './manage-stock-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageStockSubPagePageRoutingModule
  ],
  declarations: [ManageStockSubPagePage]
})
export class ManageStockSubPagePageModule {}
