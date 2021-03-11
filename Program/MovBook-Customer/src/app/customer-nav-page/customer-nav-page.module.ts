import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerNavPagePageRoutingModule } from './customer-nav-page-routing.module';

import { CustomerNavPagePage } from './customer-nav-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerNavPagePageRoutingModule
  ],
  declarations: [CustomerNavPagePage]
})
export class CustomerNavPagePageModule {}
