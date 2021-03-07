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
    name:
    [
      {
      prefix: '',
      lastName: '',
      firstName: '',
      middleName: '',
     }
    ],
    email: '',
    password: '',
    registeredDateTime: '',
    address: 
    [
    {
      streetAddress: '',
      city: '',
      postalZipCode: ''
    }
    ],
    phone: '',
  }

  ngOnInit() {
    this.getuser(this.temoryid);
  }

  temoryid: string = "yasuo@movbook.com";

  async editprofilemodal()
  {
    const Emodal = await this.modalctrl.create({
      component: EditProfileComponentComponent,
      cssClass: 'customer-edit-profile-css'
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
      console.log(profiles);
      this.user = 
      {
        email: profiles.users.email,
        password: profiles.users.email,
        name: [
          {
            prefix: profiles.users.name[0].prefix,
            firstName: profiles.users.name[0].firstName,
            middleName: profiles.users.name[0].middleName,
            lastName : profiles.users.name[0].lastName    
          }
        ],
        registeredDateTime: profiles.users.registeredDateTime,
        address:[
          {
            streetAddress: profiles.users.address[0].streetAddress,
            city: profiles.users.address[0].city,
            postalZipCode: profiles.users.address[0].postalZipCode
          }
        ],
        phone: profiles.users.phone,
      };
      console.log(this.user);
    });
  }
}
