import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerAccountsSubPagePageRoutingModule } from './manager-accounts-sub-page-routing.module';

import { ManagerAccountsSubPagePage } from './manager-accounts-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerAccountsSubPagePageRoutingModule
  ],
  declarations: [ManagerAccountsSubPagePage]
})
export class ManagerAccountsSubPagePageModule {}
