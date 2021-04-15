import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from "./../../services/account/customer.service";
import { switchMap } from "rxjs/operators";
import { StripeService, StripeCardNumberComponent } from "ngx-stripe";
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from "@stripe/stripe-js";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController, ModalController } from '@ionic/angular';

let refreshmentsTotal = 0;
let movieTotal = 0;
let billTotal = 0;
let refreshmentsLastItem: number;
let movieSelectionData;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})

export class PaymentPage implements OnInit {
  @Input() id: any;
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "300",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "20px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "en",
    fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Paytone+One&display=swap" }]
  };
  private PAY_BASE_URL = environment.MOVBOOK_BACKEND_ADMIN_SERVER_URL;

  Beverages: Object;
  Refreshments: any = [];
  Total: number;
  CustomerEmail: any;
  title: any;
  adultQuantity: any;
  childQuantity: any;
  seatNumbers: any;

  constructor(private customerService: CustomerService, private modalCtrl: ModalController,
    public http: HttpClient,
    private stripeService: StripeService,
    private alertCtrl: AlertController,) { }
  allticketInformation: any;

  ngOnInit() {
    console.log(this.id)
    var ticketData = this.id;
    movieSelectionData = ticketData
    this.customerService.allticketInformation.subscribe(ticketData => {
      movieSelectionData = ticketData
      movieTotal = ticketData['ticketDetalis']['totalAmount']
      billTotal += movieTotal
      this.Total = billTotal
      this.title = ticketData['movieInfo']['movieTitle'];
      this.adultQuantity = ticketData['ticketDetalis']['adultTickets'];
      this.childQuantity = ticketData['ticketDetalis']['childrenTickets'];
      this.seatNumbers = ticketData['ticketDetalis']['seatNumbers'];
    })
    this.getBeverages();
  }
  getBeverages() {
    this.customerService.getBeverages().subscribe(
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
    let name: string = beverage.name
    let price: number = beverage.price
    let quantity: number = beverage.quantity
    refreshmentsLastItem = price * quantity
    refreshmentsTotal += refreshmentsLastItem
    this.Refreshments.push("Item: " + name + " x " + quantity);
    billTotal += refreshmentsLastItem;
    this.Total = billTotal;
    console.log("Total:" + billTotal)
  }
  beverageRemove() {
    refreshmentsTotal -= refreshmentsLastItem
    this.Refreshments.pop();
    billTotal -= refreshmentsLastItem;
    this.Total = billTotal;
    console.log("Total:" + billTotal)
  }


  book() {
    this.createPaymentIntent(billTotal)
      .pipe(
        switchMap((payment) =>
          this.stripeService.confirmCardPayment(
            payment.client_secret,
            {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.CustomerEmail,
                },
              },
            }
          )
        )
      )
      .subscribe(async (result) => {
        if (result.error) {
          const alert = await this.alertCtrl.create({
            header: 'Payment Cancelled',
            subHeader: 'Not funds',
            backdropDismiss: true,
            message: 'Bank rejected payments due to no funds',
          });
          await alert.present();
        } else if (result.paymentIntent.status === "succeeded") {

          this.customerService.storeBooking(this.Refreshments, movieSelectionData, billTotal).subscribe(
            async (data) => {
              const alert = await this.alertCtrl.create({
                header: 'Payment Sucessful',
                subHeader: 'Booking Stored',
                backdropDismiss: true,
                message: 'Payment received booking data stored.',
              })
              await alert.present();
            },
            (error) => {
              console.log(error);
            }
          );
          async (err) => {
            console.log(err);
          }
        }
      })

  }
  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${this.PAY_BASE_URL}pay`,
      { amount }
    );
  }
  beverages(beverage) {
    console.log(beverage.title);
  }

}
