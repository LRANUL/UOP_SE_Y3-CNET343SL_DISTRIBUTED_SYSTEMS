import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieCatalogSubPagePageRoutingModule } from './movie-catalog-sub-page-routing.module';

import { MovieCatalogSubPagePage } from './movie-catalog-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieCatalogSubPagePageRoutingModule
  ],
  declarations: [MovieCatalogSubPagePage]
})
export class MovieCatalogSubPagePageModule {}
