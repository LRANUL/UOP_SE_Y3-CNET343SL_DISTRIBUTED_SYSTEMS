import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactusSubPagePageRoutingModule } from './contactus-sub-page-routing.module';

import { ContactusSubPagePage } from './contactus-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactusSubPagePageRoutingModule
  ],
  declarations: [ContactusSubPagePage]
})
export class ContactusSubPagePageModule {}
