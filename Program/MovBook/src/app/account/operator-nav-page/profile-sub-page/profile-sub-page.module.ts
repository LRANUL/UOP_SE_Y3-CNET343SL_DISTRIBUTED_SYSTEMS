import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSubPagePageRoutingModule } from './profile-sub-page-routing.module';

import { ProfileSubPagePage } from './profile-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSubPagePageRoutingModule
  ],
  declarations: [ProfileSubPagePage]
})
export class ProfileSubPagePageModule {}
