import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OperatorService } from "./../../service/operator.service";


@Component({
  selector: 'app-setting-sub-page',
  templateUrl: './setting-sub-page.page.html',
  styleUrls: ['./setting-sub-page.page.scss'],
})
export class SettingSubPagePage implements OnInit {
  name: string;
  email: string;
  Type: any;
  Prefix: any;
  FirstName: any;
  LastName: any;
  Email: any;
  Phone: any;
  StreetAddress: any;
  City: any;
  PostalCode: any;
  RegisteredDateTime: any;


  constructor(
    public operatorService: OperatorService,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    // Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
    this.operatorService.getProfile(this.email).subscribe(
      (data) => {
        this.Type = data['0']['Role'];
        this.Prefix = data['0']['Prefix'];
        this.FirstName = data['0']['FirstName'];
        this.LastName = data['0']['LastName'];
        this.Email = data['0']['Email'];
        this.Phone = data['0']['Phone'];
        this.StreetAddress = data['0']['StreetAddress'];
        this.City = data['0']['City'];
        this.PostalCode = data['0']['PostalCode'];
        this.RegisteredDateTime = data['0']['RegisteredDateTime'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async updateEmail() {
    const alert = await this.alertController.create({
      header: "Email Update",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Email",
        },
      ],
      message: 'Enter your new email to update',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
          },
        },
        {
          text: "Change",
          handler: async (alertData) => {
            this.operatorService.updateEmail(this.Email, alertData.email).subscribe(
              async (data) => {
                console.log(data)
                if (data == 'Updated Email') {
                  this.ngOnInit();
                  const alert = await this.alertController.create({
                    header: 'Email Updated',
                    message: this.Email + ' was update to ' + alertData.email,
                  });

                  await alert.present();
                }
                else if (data == 'Not Updated"') {
                  const alert = await this.alertController.create({
                    header: 'Not Updated',
                    message: "Inform Administrator",
                  });

                  await alert.present();
                }
              },
              (error) => {
                console.log(error);
              }
            )
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword() {
    const alert = await this.alertController.create({
      header: "Password Update",
      inputs: [
        {
          name: "password",
          type: "password",
          placeholder: "Enter Password",
        },
      ],
      message: 'Enter your new password to update',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
          },
        },
        {
          text: "Change",
          handler: async (alertData) => {
            let password = alertData.password; // Bandara (10673936) use 'password' value for password update purpose
            
            const alert = await this.alertController.create({
              header: 'Email Updated',
              message: this.Email + ' was update to ' + alertData.email,
            });

            await alert.present();
          }
        }
      ],
    });
    await alert.present();
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
