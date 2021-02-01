import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfileComponentComponent } from './edit-profile-component/edit-profile-component.component';
import { PasswordChangeComponentComponent } from './password-change-component/password-change-component.component';

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
})
export class ProfileSubPagePage implements OnInit {

  constructor( private modalctrl: ModalController) { }

  ngOnInit() {
  }

  async editprofilemodal()
  {
    const Emodal = await this.modalctrl.create({
      component: EditProfileComponentComponent,
      cssClass: 'my-custom-modal-css'
    });
   await Emodal.present();
  }

  async openmodal()
  {
  const modal = await this.modalctrl.create({
    component: PasswordChangeComponentComponent
  });
  await modal.present();
  }



}
