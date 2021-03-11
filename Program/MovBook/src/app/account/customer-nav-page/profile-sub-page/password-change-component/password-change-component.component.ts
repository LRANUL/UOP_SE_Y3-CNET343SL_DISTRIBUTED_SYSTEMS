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

  oldpassword:string = "";
  newpassword:string = "";

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
