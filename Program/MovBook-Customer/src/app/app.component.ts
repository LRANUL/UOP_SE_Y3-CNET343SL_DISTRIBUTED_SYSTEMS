import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { async } from 'rxjs';
import { ContactUsComponent } from './customer-nav-page/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './customer-nav-page/terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalCtrl: ModalController) {}

async openContactUsModal()
{
const modal = await this.modalCtrl.create({
  component: ContactUsComponent,
  cssClass: 'customer-contact-us-css'
});
await modal.present();
}

async openTermsmodal()
{
const modal = await this.modalCtrl.create({
  component: TermsAndConditionsComponent,
  cssClass: 'customer-terms-and-condition-css'
});
await modal.present();
}

}
