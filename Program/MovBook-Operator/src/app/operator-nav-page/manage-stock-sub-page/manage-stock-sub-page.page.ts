import { Component, OnInit } from '@angular/core';
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
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    // Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
    this.getBeverages();
  }
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
  updateStock() {
    console.log(this.Quantity)
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
}
