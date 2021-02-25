import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { profile } from 'src/app/models/account/customers';
import { CustomerService} from 'src/app/services/account/customer.service';
import { EditProfileComponentComponent } from './edit-profile-component/edit-profile-component.component';
import { PasswordChangeComponentComponent } from './password-change-component/password-change-component.component';

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
})
export class ProfileSubPagePage implements OnInit {

  constructor( private modalctrl: ModalController, private customerService: CustomerService) { }

  public users : Observable<profile[]>;

  user: profile = {
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    NIC: '',
    address: '',
    phone: '',
  }

  ngOnInit() {
    this.getuser(this.temoryid);
  }

  temoryid: string = "Katherine@movbook.com";

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

  getuser(id: any)
  {
    this.customerService.getUser(id).subscribe(profiles => {
      this.user = 
      {
        email: profiles.users.email,
        firstName: profiles.users.name,
        middleName: '',
        lastName: '',
        NIC: '',
        address: profiles.users.address,
        phone: profiles.users.phone,
      };
    });
  }
}
