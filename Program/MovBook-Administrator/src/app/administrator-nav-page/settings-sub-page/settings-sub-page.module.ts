import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsSubPagePageRoutingModule } from './settings-sub-page-routing.module';

import { SettingsSubPagePage } from './settings-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsSubPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsSubPagePage]
})
export class SettingsSubPagePageModule {}
