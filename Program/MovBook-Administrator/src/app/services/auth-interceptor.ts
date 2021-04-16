import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor { 
  constructor(private authServ:AuthService){}

  intercept(req:HttpRequest<any>, next:HttpHandler){ 
    const Token =this.authServ.getToken();
    const authRequest = req.clone({ 
      headers:req.headers.set('Authorization',"Bearer "+Token)
    });

    return next.handle(authRequest);
  }
}
