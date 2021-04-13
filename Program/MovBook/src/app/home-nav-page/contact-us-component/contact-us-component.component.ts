import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us-component',
  templateUrl: './contact-us-component.component.html',
  styleUrls: ['./contact-us-component.component.scss'],
})
export class ContactUsComponentComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close()
  {
    this.modalCtrl.dismiss();
  }

}
