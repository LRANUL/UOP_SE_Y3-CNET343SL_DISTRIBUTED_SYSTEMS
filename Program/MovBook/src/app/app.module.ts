import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxStripeModule.forRoot('pk_test_51IEFJWJcuxwrCkGRQaDQ8ycbMSxyrsApmMnXmb9Zlnvo3rcws57a5fRf8gdD6n1meV9yH8KctT2OUbN8kfRka2hi00T1GM5O0W')
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{
        provide: HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass:ErrorInterceptor,
        multi:true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
