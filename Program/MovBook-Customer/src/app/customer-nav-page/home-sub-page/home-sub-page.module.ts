import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSubPagePageRoutingModule } from './home-sub-page-routing.module';

import { HomeSubPagePage } from './home-sub-page.page';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';
import { FooterComponent } from 'src/app/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSubPagePageRoutingModule
  ],
  declarations: [HomeSubPagePage, HeaderComponentComponent, FooterComponent]
})
export class HomeSubPagePageModule {}
