import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-password-change-component',
  templateUrl: './password-change-component.component.html',
  styleUrls: ['./password-change-component.component.scss'],
})
export class PasswordChangeComponentComponent implements OnInit {

  constructor(private modalcntrl: ModalController) { }

  ngOnInit() {}
  email:string = localStorage.getItem('email');

  oldpassword:string = "123456";
  newpassword:string = "12345678";

  passwordchange()
  {
  console.log(this.newpassword, this.oldpassword);
  this.modalcntrl.dismiss();
  }

  dismiss()
  {
    this.oldpassword = "";
    this.newpassword = "";
    this.modalcntrl.dismiss();
  }

}
