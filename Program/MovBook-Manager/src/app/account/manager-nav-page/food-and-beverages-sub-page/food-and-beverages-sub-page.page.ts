import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AddBeverageModalPage } from './add-beverage-modal/add-beverage-modal.page';
import { UpdateBeverageModalPage } from './update-beverage-modal/update-beverage-modal.page';

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
  loadingSpinnerGetBeverages: Boolean = false;

  constructor(
    public managerService: ManagerService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    // Retrieving list of beverages upon page render
    this.getBeverages();
  }

  // Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Function - Implementation for opening the 'Add Beverage' modal
  async openAddBeverageModal(){
    const addBeverageModal = await this.modalController.create({
      component: AddBeverageModalPage,
      cssClass: 'add-location-modal',
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    addBeverageModal.present();
    // Collecting response data when modal is dismissed
    const { data } = await addBeverageModal.onDidDismiss();
    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Retrieving updated list of beverages
        this.getBeverages();
      }
    }
  }

  // Function - Implementation for opening the 'Edit Beverage Modal' modal
  async openEditBeverageModal(beverageObjectId: String, beverageName: String, beverageImageURL: String){
    const editBeverageModal = await this.modalController.create({
      component: UpdateBeverageModalPage,
      cssClass: 'add-new-showing-experience-modal',
      componentProps: {
        passingBeverageObjectId: beverageObjectId,
        passingBeverageName: beverageName,
        passingBeverageImageURL: beverageImageURL
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    editBeverageModal.present();

    // Collecting response data when modal is dismissed
    const { data } = await editBeverageModal.onDidDismiss();

    // If Condition - checking whether there is data in the response 'data' object
    if(data != null){
      // If condition - checking whether response data contains true
      if(data == true){
        // Retrieving updated list of beverages
        this.getBeverages();
      }
    }
  }

  // Function - Retrieving list of beverages
  getBeverages() {
    this.loadingSpinnerGetBeverages = true;
    this.managerService.getBeverages().subscribe(
      (data) => {
        this.loadingSpinnerGetBeverages = false;
        this.Beverages = data;
      },
      (error) => {
        this.loadingSpinnerGetBeverages = false;
        this.alertNotice("ERROR", "Unable to retrieve beverages, apologies for the inconvenience. Please contact administrator.");
        console.log(error);
      }
    );
  }

  // Function - Updating 'selectedBeverage' to user selected beverage name
  beverageUpdate(beverage) {
    this.selectedBeverage = beverage.name
  }

  // Function - Updating beverage stock to user entered value
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

  // Function - Updating beverage price to user entered value
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

  // Confirm Box Implementation - Remove Beverage
  async confirmBoxRemoveBeverage (title: string, content: string, beverageObjectId: String) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Confirm Box: Request denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Confirm Box: Request accepted");

            // Remove Beverage
            this.removeBeverage(beverageObjectId);
          }
        }
      ]
    });
    await alert.present();
  }

  // Function - Removing one beverage item
  removeBeverage(beverageObjectId: String){
    // Passing 'beverageObjectId' to the server-side to remove document from the database
    this.managerService.removeBeverage(beverageObjectId).subscribe((removeBeverageResponse: any) => {
      if(removeBeverageResponse.message == "Refreshment removed"){
        // Showing success message box to user
        this.alertNotice("Removed", "Beverage Successfully Removed");

        // Retrieving updated list of beverages
        this.getBeverages();
      }
      else{
        console.log('Error - Unable to remove beverage');

        // Showing error message box to user
        this.alertNotice("ERROR", "Unable to remove beverage");
      }
    }, (error: ErrorEvent) => {
      console.log('Error - Unable to remove beverage: ', error);

      // Showing error message box to user
      this.alertNotice("ERROR", "Unable to remove beverage");
    });
  }

}
