import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactUsComponentComponent } from '../contact-us-component/contact-us-component.component';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-about-us-sub-page',
  templateUrl: './about-us-sub-page.page.html',
  styleUrls: ['./about-us-sub-page.page.scss'],
})
export class AboutUsSubPagePage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openmodalCustomer()
  {
  const modal = await this.modalCtrl.create({
    component: ContactUsComponentComponent,
    cssClass: 'customer-contact-us-css'
  });
  await modal.present();
  }

  async openmodalterms()
  {
  const modal = await this.modalCtrl.create({
    component: TermsAndConditionsComponent,
    cssClass: 'customer-terms-and-condition-css'
  });
  await modal.present();
  }

  aboutusNav()
  {
      this.router.navigate(['/about us']);
  }

  homeNav()
  {
      this.router.navigate(['/home']);
  }

}
