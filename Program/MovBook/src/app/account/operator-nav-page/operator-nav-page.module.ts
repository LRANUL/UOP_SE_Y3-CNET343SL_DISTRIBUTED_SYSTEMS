import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatorNavPagePageRoutingModule } from './operator-nav-page-routing.module';

import { OperatorNavPagePage } from './operator-nav-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatorNavPagePageRoutingModule
  ],
  declarations: [OperatorNavPagePage]
})
export class OperatorNavPagePageModule {}
