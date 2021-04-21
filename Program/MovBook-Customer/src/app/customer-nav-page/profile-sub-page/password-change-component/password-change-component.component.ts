import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change-component',
  templateUrl: './password-change-component.component.html',
  styleUrls: ['./password-change-component.component.scss'],
})
export class PasswordChangeComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController, private AuthServ:AuthService) { }

  ngOnInit() {}
  email:string = localStorage.getItem('email');

  oldpassword:string = "";
  newpassword:string = "";

  passwordchange()
  {
  console.log(this.newpassword, this.oldpassword);
  this.AuthServ.onUpdatePassword(this.newpassword,this.oldpassword,this.email);
  this.modalcntrl.dismiss();
  }

  dismiss()
  {
    this.oldpassword = "";
    this.newpassword = "";
    this.modalcntrl.dismiss();
  }
}
