import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home-nav-page/home-nav-page.module').then( m => m.HomeNavPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login-modal/login-modal.module').then( m => m.LoginModalPageModule)
  },
  {
    path: 'about us',
    loadChildren: () => import('./home-nav-page/about-us-sub-page/about-us-sub-page.module').then( m => m.AboutUsSubPagePageModule)
  },
  {
    path: 'customer-registration',
    loadChildren: () => import('./auth/customer-registration-modal/customer-registration-modal.module').then( m => m.CustomerRegistrationModalPageModule)
  },
  // {
  //   path: 'administrator',
  //   loadChildren: () => import('./account/administrator-nav-page/administrator-nav-page.module').then( m => m.AdministratorNavPagePageModule)
  // },
  // {
  //   path: 'operator',
  //   loadChildren: () => import('./account/operator-nav-page/operator-nav-page.module').then( m => m.OperatorNavPagePageModule)
  // },
  {
    path: 'customer',
    loadChildren: () => import('./account/customer-nav-page/customer-nav-page.module').then( m => m.CustomerNavPagePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
