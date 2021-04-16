import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'manager',
    loadChildren: () => import('./account/manager-nav-page/manager-nav-page.module').then( m => m.ManagerNavPagePageModule)
    , canActivate:[AuthGuard]
  }
  // {
  //   path: 'password-reset',
  //   loadChildren:() => import('./login/password-reset/password-reset.module').then((m)=>{ m.PasswordResetPageModule})
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
