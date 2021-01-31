import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingSubPagePageRoutingModule } from './setting-sub-page-routing.module';

import { SettingSubPagePage } from './setting-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingSubPagePageRoutingModule
  ],
  declarations: [SettingSubPagePage]
})
export class SettingSubPagePageModule {}
