import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OperatorService } from 'src/app/service/operator.service';

@Component({
  selector: 'app-manage-stock-sub-page',
  templateUrl: './manage-stock-sub-page.page.html',
  styleUrls: ['./manage-stock-sub-page.page.scss'],
})
export class ManageStockSubPagePage implements OnInit {
  name: string;
  email: string;
  Beverages: Object;
  selectedBeverage: any;
  Quantity: any;

  constructor(
    public operatorService: OperatorService,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    var fname = localStorage.getItem('name');
    var lname = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.name = fname+" "+ lname;

    this.getBeverages();
  }
  /** Get refreshments list */

  getBeverages() {
    this.operatorService.getBeverages().subscribe(
      (data) => {
        this.Beverages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  beverageUpdate(beverage) {
    this.selectedBeverage = beverage.name
  }
  /** Update Refreshments stock level */

  updateStock() {
    this.operatorService.updateStock(this.selectedBeverage, this.Quantity).subscribe(
      async (data) => {
        console.log(data)
         if (data == 'Updated Stock') {
          this.getBeverages();
          const alert = await this.alertController.create({
            header: 'Stock Updated',
            message: this.selectedBeverage + ' stock was update to ' + this.Quantity,
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
