import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-food-and-beverages-sub-page',
  templateUrl: './food-and-beverages-sub-page.page.html',
  styleUrls: ['./food-and-beverages-sub-page.page.scss'],
})
export class FoodAndBeveragesSubPagePage implements OnInit {

  name: string;
  email: string;
  Beverages: Object;
  selectedBeverage: any;
  Quantity: any;
  Price: any;

  constructor(
    public managerService: ManagerService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getBeverages();
  }
  getBeverages() {
    this.managerService.getBeverages().subscribe(
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
  updateStock() {
    console.log(this.Quantity)
    this.managerService.updateStock(this.selectedBeverage, this.Quantity).subscribe(
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
  updatePrice() {
    this.managerService.updatePrice(this.selectedBeverage, this.Price).subscribe(
      async (data) => {
        console.log(data)
         if (data == 'Updated Stock') {
          this.getBeverages();
          const alert = await this.alertController.create({
            header: 'Price Updated',
            message: this.selectedBeverage + ' stock price was update to ' + this.Price + 'LKR',
          });

          await alert.present();
        }
        else if (data == 'Not Updated"') {
          const alert = await this.alertController.create({
            header: 'Price Not Updated',
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
}

