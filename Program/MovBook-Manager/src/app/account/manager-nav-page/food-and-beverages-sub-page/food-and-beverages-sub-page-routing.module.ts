import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodAndBeveragesSubPagePage } from './food-and-beverages-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: FoodAndBeveragesSubPagePage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodAndBeveragesSubPagePageRoutingModule {}
