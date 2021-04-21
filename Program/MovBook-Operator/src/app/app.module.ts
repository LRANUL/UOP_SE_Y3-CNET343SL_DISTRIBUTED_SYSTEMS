import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './service/auth-interceptor';
import { NgxElectronModule } from 'ngx-electron';
import { NgxStripeModule } from 'ngx-stripe';
import { ErrorInterceptor } from './service/error-interceptor';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,NgxElectronModule,NgxStripeModule.forRoot('pk_test_51IEFJWJcuxwrCkGRQaDQ8ycbMSxyrsApmMnXmb9Zlnvo3rcws57a5fRf8gdD6n1meV9yH8KctT2OUbN8kfRka2hi00T1GM5O0W')],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},{provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
