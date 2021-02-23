import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.component.html',
  styleUrls: ['./edit-profile-component.component.scss'],
})
export class EditProfileComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController, private customerService: CustomerService) { }

  ngOnInit() {
    this.getuser(this.temoryid);
  }

    profile = {
    Fname :'',
    Mname: '',
    Lname: '',
    Mnumber: '',
    NIC: '',
    Address: '',
    email: ''
  };

  UFname;
  UMname;
  ULname;
  UMnumber;
  UNIC;
  UAddress;
  Uemail;

  temoryid = "Katherine@movbook.com";

  closemodal()
  {
    this.profile.Fname = "";
    this.profile.Mname= "";
    this.profile.Lname = "";
    this.profile.Mnumber = "";
    this.profile.NIC = "";
    this.profile.Address= "";
    this.profile.email = "";
    this.modalcntrl.dismiss();
  }

  getuser(id: string)
  {
    this.customerService.getUser(id).subscribe(profiles => {
      this.profile = 
      {
        email: profiles.users.email,
        Fname: profiles.users.name,
        Mname: '',
        Lname: '',
        NIC: '',
        Address: profiles.users.address,
        Mnumber: profiles.users.phone
      };
    });
  }

  userupdate()
  {
    this.customerService.updateuser(this.profile, this.temoryid);
    this.modalcntrl.dismiss();
  }

}
