import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsSubPagePageRoutingModule } from './contact-us-sub-page-routing.module';

import { ContactUsSubPagePage } from './contact-us-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactUsSubPagePageRoutingModule
  ],
  declarations: [ContactUsSubPagePage]
})
export class ContactUsSubPagePageModule {}
