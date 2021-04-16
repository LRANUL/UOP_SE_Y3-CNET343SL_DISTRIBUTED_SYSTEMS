import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertController: AlertController){}

  errorMessage = "Unknown Error Occurred!! ";
  intercept(req:HttpRequest<any>, next:HttpHandler){
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{

        console.log(this.errorMessage);
        if(error.error.message){ this.errorMessage =error.error.message; };
        this.presentAlert();

        return throwError(error);
      })

      );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: this.errorMessage,
      buttons: ['OK']
    });
    await alert.present();

  }
}
