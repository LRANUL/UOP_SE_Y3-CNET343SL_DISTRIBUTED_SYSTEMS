import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportSubPagePageRoutingModule } from './support-sub-page-routing.module';

import { SupportSubPagePage } from './support-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportSubPagePageRoutingModule
  ],
  declarations: [SupportSubPagePage]
})
export class SupportSubPagePageModule {}
