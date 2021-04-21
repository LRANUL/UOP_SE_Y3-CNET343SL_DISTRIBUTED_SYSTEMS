import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OperatorService } from "./../../service/operator.service";
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-setting-sub-page',
  templateUrl: './setting-sub-page.page.html',
  styleUrls: ['./setting-sub-page.page.scss'],
})
export class SettingSubPagePage implements OnInit {
  name: string;
  email: string;
  Name: string;
  Email: any;
  Phone: any;
  Address: string;
  RegisteredDateTime: any;



  constructor(
    public operatorService: OperatorService,
    public toastController: ToastController,
    public alertController: AlertController,
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    var fname = localStorage.getItem('name');
    var lname = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.name = fname+" "+ lname;

    this.operatorService.getProfile(this.email).subscribe(
      (data) => {
        console.log(data)
        var details = data['0']
        this.Name = details['name']['prefix'] + '. ' + details['name']['firstName'] + ' ' + details['name']['lastName'];
        this.Email = details['emailAddress'];
        this.Phone = details['phoneNumber'];
        this.Address = details['address']['streetAddress'] + ', ' + details['address']['city'] + ', ' + details['address']['postalZipCode']
        this.RegisteredDateTime = details['registeredDateTime'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /** Update Operator email */

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
                this.operatorService.updateAuthEmail({email:alertData.email},this.Email).subscribe((res)=>{console.log(res)})
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
  /** Update operator password*/

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

  /** Logout operator */
  logout(){
    this.authServ.logOut();
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
