import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { profile } from 'src/app/models/account/customers';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.component.html',
  styleUrls: ['./edit-profile-component.component.scss'],
})
export class EditProfileComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController, private customerService: CustomerService, private route: Router) { }

  public users : Observable<profile[]>;

    profile: profile = {
      name:
        {
        prefix: '',
        lastName: '',
        firstName: '',
        middleName: '',
       },
      email: '',
      registeredDateTime: '',
      address:
      {
        streetAddress: '',
        city: '',
        postalZipCode: '',
      },
      phone: '',
  };

  profileAuth = {
    name:''
      ,
    email: '',
    registeredDateTime: '',
    address:'',
    phone: '',
};

  ngOnInit() {
    this.getuser(this.temoryid);
  }

  UFname;
  UMname;
  ULname;
  UMnumber;
  UNIC;
  UAddress;
  Uemail;

  temoryid = localStorage.getItem('email');

  closemodal()
  {
    this.modalcntrl.dismiss();
  }

  getuser(id: string)
  {
    this.customerService.getUser(id).subscribe(profiles => {
      console.log(profiles);
      this.profile =
      {
        email: profiles.users.email,
        name:
          {
            prefix: profiles.users.name.prefix,
            firstName: profiles.users.name.firstName,
            middleName: profiles.users.name.middleName,
            lastName : profiles.users.name.lastName
          },
        registeredDateTime: profiles.users.registeredDateTime,
        address:
          {
            streetAddress: profiles.users.address.streetAddress,
            city: profiles.users.address.city,
            postalZipCode: profiles.users.address.postalZipCode
          },
        phone: profiles.users.phone,
      };

      this.profileAuth =
      {
        email: profiles.users.email,
        name:profiles.users.name.prefix+" "+profiles.users.firstName +" "+profiles.users.name.lastName,
        registeredDateTime: profiles.users.registeredDateTime,
        address:profiles.users.address.city,
        phone: profiles.users.phone,
      };
      console.log(this.profile);
    });
  }

  userupdate()
  {
    this.customerService.updateuser(this.profile,this.profileAuth, this.temoryid);
    this.customerService.filter(this.profile)
    this.modalcntrl.dismiss();
  }
}
