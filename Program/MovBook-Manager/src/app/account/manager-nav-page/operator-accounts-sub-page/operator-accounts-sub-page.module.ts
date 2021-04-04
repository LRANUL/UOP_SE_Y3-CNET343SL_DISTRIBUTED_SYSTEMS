import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatorAccountsSubPagePageRoutingModule } from './operator-accounts-sub-page-routing.module';

import { OperatorAccountsSubPagePage } from './operator-accounts-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatorAccountsSubPagePageRoutingModule
  ],
  declarations: [OperatorAccountsSubPagePage]
})
export class OperatorAccountsSubPagePageModule {}
