import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager-nav-page',
  templateUrl: './manager-nav-page.page.html',
  styleUrls: ['./manager-nav-page.page.scss'],
})
export class ManagerNavPagePage implements OnInit {

  selectedSubPagePath = '';
  name: string;
  email: string;
  lName:string;
  fName:String

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService:AuthService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedSubPagePath = event.url;
    });
  }

  ngOnInit() {
    this.fName = localStorage.getItem('name');
    this.lName= localStorage.getItem('lastName')
    this.email = localStorage.getItem('email');
    // Remove after getting login credentials
    this.name = this.fName+" "+this.lName;
  }

  // Logout Alert Box Implementation
  async logoutAlert( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Logout request canceled");
          }
        },
        {
          text: 'Continue',
          handler: () => {

            // Showing loading spinner, logging manager out, and redirecting to the login page
            this.logoutAlertContinue();
            this.authService.logOut()

          }
        }
      ]
    });
    await alert.present();
  }


  // Logout Alert - 'Continue' Implementation
  async logoutAlertContinue() {
    // Loading Spinner
    const loading = await this.loadingController.create({
      message: 'Logging Out..',
      duration: 3000
    });

    /**
     * TODO:
     * - Update manager user account activity ('accountActivity') to OFFLINE
     * - Insert current datetime to manager user account activity logout datetime ('logoutDateTime')
     * - If no errors are occurred, redirect manager user to the login page
     */

    // Redirecting manager user to login page
    //this.router.navigate(["/login"]);
    await loading.present();
  }

}
