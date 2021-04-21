import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewShowingModalPageRoutingModule } from './view-showing-modal-routing.module';

import { ViewShowingModalPage } from './view-showing-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewShowingModalPageRoutingModule
  ],
  declarations: [ViewShowingModalPage]
})
export class ViewShowingModalPageModule {}
