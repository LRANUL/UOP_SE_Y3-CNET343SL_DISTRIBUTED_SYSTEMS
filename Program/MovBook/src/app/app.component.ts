import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import '@capacitor-community/firebase-remote-config';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
AngularFireModule.initializeApp(environment.firebase)
const { FirebaseRemoteConfig } = Plugins;
FirebaseRemoteConfig.initializeFirebase({
  apiKey: "AIzaSyDgIZg9bO1QslkIm_c00Ivp4Qql-C-lyKI",
  authDomain: "movbook-18609.firebaseapp.com",
  projectId: "movbook-18609",
  storageBucket: "movbook-18609.appspot.com",
  messagingSenderId: "1069731166949",
  appId: "1:1069731166949:web:92d5f46a3b09050966f20c"
});
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  remoteConfig: any = null;

  constructor(private alertCtrl: AlertController) { }

  async ngOnInit() {
    const { FirebaseRemoteConfig } = Plugins;
    this.remoteConfig = FirebaseRemoteConfig as any;
    await this.remoteConfig.initialize({ minimumFetchIntervalInSeconds: 3600 });
    this.remoteConfig.defaultConfig = {
      "maintenance": "false",
      "offer": "false",
    };
    await this.maintenanceLockCheck().then(async function () {
      const alertMaintenance = await this.alertCtrl.create({
        header: 'Under Maintenance',
        subHeader: 'Site Down',
        backdropDismiss: false,
        message: 'We are currently, maintaining the site, visit back shortly',
      });
      await alertMaintenance.present();
    }).catch(function () {
      console.log("Promise Rejected");
    });
    const sales = await this.seasonOfferCheck().then(async function () {
      const alertSales = await this.alertCtrl.create({
        header: 'Sales Offer',
        subHeader: '25% Offer on All tickets',
        backdropDismiss: true,
        message: 'For all tickets from April to July, 25% discount!',
      });
      await alertSales.present();
    }).catch(function () {
      console.log("Promise Rejected");
    })
  }
  async maintenanceLockCheck() {
    if (this.remoteConfig) {
      const maintenanceLock = await this.maintenanceLock() || 'false';
      if (maintenanceLock == 'true') {
        return true;
      }
      return false;
    }
    return false;
  }
  async seasonOfferCheck() {
    if (this.remoteConfig) {
      const seasonOffer = await this.seasonOffer() || 'false';
      if (seasonOffer == 'true') {
        return true;
      }
      return false;
    }
    return false;
  }
  private async maintenanceLock() {
    return new Promise<string>((resolve, reject) => {
      this.remoteConfig.fetchAndActivate().then(() => {
        this.remoteConfig.getString({ key: 'maintenance', })
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
        .catch(err => reject(err));
    });
  }

  private async seasonOffer() {
    return new Promise<string>((resolve, reject) => {
      this.remoteConfig.fetchAndActivate().then(() => {
        this.remoteConfig.getString({ key: 'offer', })
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
        .catch(err => reject(err));
    });
  }

}
