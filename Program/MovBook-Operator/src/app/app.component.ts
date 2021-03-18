import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { RemoteConfigService } from './service/remote-config.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private remoteConfig: RemoteConfigService,
    private alertCtrl: AlertController) { }

  async ngOnInit() {
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
