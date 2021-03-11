import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageNotificationsSubPagePageRoutingModule } from './manage-notifications-sub-page-routing.module';

import { ManageNotificationsSubPagePage } from './manage-notifications-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageNotificationsSubPagePageRoutingModule
  ],
  declarations: [ManageNotificationsSubPagePage]
})
export class ManageNotificationsSubPagePageModule {}
