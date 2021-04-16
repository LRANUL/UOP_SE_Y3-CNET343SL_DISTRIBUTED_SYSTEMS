import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OperatorService } from 'src/app/service/operator.service';

@Component({
  selector: 'app-support-sub-page',
  templateUrl: './support-sub-page.page.html',
  styleUrls: ['./support-sub-page.page.scss'],
})
export class SupportSubPagePage implements OnInit {
  name: string;
  email: string;
  promotion: boolean;
  maintainence: boolean;
  Messages: Object;
  selectedMessage: any;
  selectedMessageEmail: any;
  selectedMessageContent: any;
  selectedMessageSubject: any;
  MessageResponse: any;

  constructor(
    public operatorService: OperatorService,
    public alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    // Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';

    await this.getMessages();
    this.operatorService.getOfferStatus().subscribe(
      (data) => {
        console.log(data)
        if (data == 'true') {
          this.promotion = true
        }
        else {
          this.promotion = false
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.operatorService.getMaintenanceStatus().subscribe(
      (data) => {
        console.log(data)
        if (data == 'true') {
          this.maintainence = true;
        }
        else {
          this.maintainence = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updatePromotion(promotion) {
    this.operatorService.setOfferStatus(promotion).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateMaintainence(maintainence) {
    this.operatorService.setMaintenanceStatus(maintainence).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async getMessages() {
    (await this.operatorService.getMessages()).subscribe(
      (data) => {
        this.Messages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  selectMessage(messages) {
    this.selectedMessage = messages._id
    this.selectedMessageEmail = messages.email
    this.selectedMessageSubject = messages.subject
  }
  sendReply() {
    this.operatorService.sendMessage(this.selectedMessage, this.MessageResponse).subscribe(
      async (data) => {
        console.log(data)
        if (data == 'Message Sent') {
          this.getMessages();
          // Data clean 
          this.selectedMessage = null
          this.selectedMessageEmail = null
          this.selectedMessageSubject = null
          this.MessageResponse = null
          const alert = await this.alertController.create({
            header: 'Reponse sent',
            message: 'Reply was sent to ' + this.selectedMessageEmail,
          });

          await alert.present();
        }
        else if (data == 'Not Updated"') {
          const alert = await this.alertController.create({
            header: 'Stock Not Updated',
            message: "Inform Administrator",
          });

          await alert.present();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /** Navigation */
  goToDashboard() {
    this.router.navigate(['operator']);
  }
  goToBooking() {
    this.router.navigate(['operator/movie-booking']);
  }
  goToStock() {
    this.router.navigate(['operator/manage-stock']);
  }
  goToSupport() {
    this.router.navigate(['operator/support']);
  }
  goToSettings() {
    this.router.navigate(['operator/settings']);
  }
}
