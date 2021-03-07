import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { profile } from 'src/app/models/account/customers';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.component.html',
  styleUrls: ['./edit-profile-component.component.scss'],
})
export class EditProfileComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController, private customerService: CustomerService, private route: Router) { }

  ngOnInit() {
    this.getuser(this.temoryid);
  }

    profile: profile = {
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
        postalZipCode: '',
      }
      ],
      phone: '',
  };

  UFname;
  UMname;
  ULname;
  UMnumber;
  UNIC;
  UAddress;
  Uemail;

  temoryid = "yasuo@movbook.com";

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
      console.log(this.profile);
    });
  }

  userupdate()
  {
    this.customerService.updateuser(this.profile, this.temoryid);
    this.modalcntrl.dismiss();
  }

}
