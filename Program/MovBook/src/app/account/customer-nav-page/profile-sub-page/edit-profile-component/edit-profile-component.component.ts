import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.component.html',
  styleUrls: ['./edit-profile-component.component.scss'],
})
export class EditProfileComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController) { }

  ngOnInit() {}

  profile = {
    Fname :'',
    Mname: '',
    Lname: '',
    Mnumber: '',
    NIC: '',
    Address: '',
    email: ''
  };

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

  userupdate()
  {
   console.log(this.profile.Fname, this.profile.Mname, this.profile.Lname, this.profile.NIC);
    this.modalcntrl.dismiss();
  }

}
