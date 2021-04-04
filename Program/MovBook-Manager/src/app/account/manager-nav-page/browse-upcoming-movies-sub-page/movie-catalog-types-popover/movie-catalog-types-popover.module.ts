import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieCatalogTypesPopoverPageRoutingModule } from './movie-catalog-types-popover-routing.module';

import { MovieCatalogTypesPopoverPage } from './movie-catalog-types-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieCatalogTypesPopoverPageRoutingModule
  ],
  declarations: [MovieCatalogTypesPopoverPage]
})
export class MovieCatalogTypesPopoverPageModule {}
