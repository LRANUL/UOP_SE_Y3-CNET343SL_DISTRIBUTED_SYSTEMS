import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-showing-modal',
  templateUrl: './add-new-showing-modal.page.html',
  styleUrls: ['./add-new-showing-modal.page.scss'],
})
export class AddNewShowingModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // Implementation to close 'Add New Showing' modal
  async closeAddNewShowingModal(){
    await this.modalController.dismiss();
  }

}
