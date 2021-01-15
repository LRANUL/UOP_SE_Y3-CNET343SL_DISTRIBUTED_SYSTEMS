import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'administrator',
    loadChildren: () => import('./account/administrator/administrator.module').then( m => m.AdministratorPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./account/manager/manager.module').then( m => m.ManagerPageModule)
  },
  {
    path: 'operator',
    loadChildren: () => import('./account/operator/operator.module').then( m => m.OperatorPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./account/customer/customer.module').then( m => m.CustomerPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
