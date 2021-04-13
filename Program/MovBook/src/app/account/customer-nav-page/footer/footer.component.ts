import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactUsComponentComponent } from 'src/app/home-nav-page/contact-us-component/contact-us-component.component';
import { TermsAndConditionsComponent } from 'src/app/home-nav-page/terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor(private router: Router, private modalCtrl: ModalController) { }

    ngOnInit() {}
  
    async openmodal()
    {
    const modal = await this.modalCtrl.create({
      component: ContactUsComponentComponent,
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
  
  aboutUs()
    {
      this.router.navigateByUrl('customer/about-us');
    }
}
