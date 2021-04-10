import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { RemoteConfigService } from './service/remote-config.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private remoteConfig: RemoteConfigService,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    const maintenance = await this.remoteConfig.maintenanceLockCheck();
    const sales = await this.remoteConfig.seasonOfferCheck();
    if (maintenance) {
      const alertMaintenance = await this.alertCtrl.create({
        header: 'Under Maintenance',
        subHeader: 'Site Down',
        backdropDismiss: false,
        message: 'We are currently, maintaining the site, visit back shortly',
      });
      await alertMaintenance.present();
    }
    if (sales) {
      const alertSales = await this.alertCtrl.create({
        header: 'Sales Offer',
        subHeader: '25% Offer on All tickets',
        backdropDismiss: true,
        message: 'For all tickets from April to July, 25% discount!',
      });
      await alertSales.present();
    }
  }
}
