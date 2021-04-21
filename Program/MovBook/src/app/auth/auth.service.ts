import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({ providedIn:'root' })
export class AuthService{
  private BASE_URL = environment.MOVBOOK_BACKEND_ADMIN_SERVER_URL;
  private secodary_url = environment.MOVBOOK_BACKEND_URL
    private AuthStatus =false;
    private token:string;
    private authStatusListener =new Subject<boolean>();
    private tokenTimer:any;
    private loginId:string;
    private userEmail:string;
    private userName:string;
    private middleName:string;
    private lastName:string;
    private prefix:string;

    constructor(private httpCli:HttpClient, private router:Router){}

    createuser(email:string, password:string,prefix:string, fname:string,lName:string,mName:string,streetAddress:string, city:string, postalCode:string, phone:number){
      const AuthData = {email:email , password: password,prefix:prefix, fName: fname,lName:lName, city:city,postalCode:postalCode,streetAddress:streetAddress, phone:phone  };
      const customer = {email:email,password:password,fname:fname ,lName:lName,mName:mName,prefix:prefix,city:city,postalCode:postalCode,streetAddress:streetAddress, phone:phone}
      console.log(AuthData);
      this.httpCli.post(this.BASE_URL +"api/logins/signup",AuthData).subscribe(response =>{
          this.httpCli.post(this.secodary_url +"api/customers/signup",customer).subscribe(res=>{
            console.log(res);
          })
      })
      this.router.navigate(['/login']);
    }

    sendNewPassword(password:string, token:string, email:string){
        const passwordData = {password:password, passwordToken:token , email:email};
          this.httpCli.post<{message:string}>(this.BASE_URL +"api/logins/new-password",passwordData).subscribe(res=>{
            console.log(res);
          })
        }

    login(email:string,passwrd:string){
      const loginData= {email:email , password: passwrd };
        this.httpCli.post<{token:string,expiresIn:number,userId:string,email:string,fName:string,mName:string,lName:string,prefix:string}>(this.BASE_URL +'api/logins/customer-login',loginData).subscribe(res =>{
        console.log(res);
        const token = res.token;
            this.token =token
            if(this.token){
              this.userEmail =res.email;
              this.userName = res.fName;
              this.loginId = res.userId;
              const expiresInDuration = res.expiresIn;
              this.middleName =res.mName;
              this.lastName = res.lName;
              this.prefix = res.prefix;
              const nowDate = new Date();
              const expirationDate = new Date(nowDate.getTime() + expiresInDuration*1000);
              this.saveAuthData(token, expirationDate,this.loginId,this.userEmail,this.userName,this.middleName,this.lastName,this.prefix);
              this.authStatusListener.next(true);
              this.AuthStatus = true;
              this.router.navigate(['/home']);
            }
            console.log(res);

        })
    }

    onEmailSent(email:string){
      const emailSent = {email:email}
      this.httpCli.post<{message:string}>(this.BASE_URL +'api/logins/forgotPassword',emailSent).subscribe(res=>{
        console.log(res);
      })
    }

    verifyLoginCredentials(email:string, password:string){
      const loginDetails = { email: email, password: password }
      return this.httpCli.post(this.BASE_URL + "api/logins/manager-login-check",loginDetails);
    }
    getToken(){
      return this.token;
    }

    getAuthStatus(){
      return this.AuthStatus;
    }

    getAuthStatusSub(){
      return this.authStatusListener.asObservable();
    }

    logOut(){
      this.token =null;
      this.AuthStatus=false;
      this.userEmail =null;
      this.loginId =null;
      this.userName =null;
      this.clearAuthData();
      clearTimeout(this.tokenTimer);
      this.authStatusListener.next(false);
      this.router.navigate(['/']);
    }

    autoAuthUser(){
      const authInfo = this.getAuthData();
      console.log(authInfo)
      if(!authInfo){
        return;
      }

      const now = new Date();
      const expiresIn  =  authInfo.expirationDate.getTime() - now.getTime() ;
      if(expiresIn > 0){
        this.token = authInfo.token;
        this.AuthStatus = true;
        this.loginId = authInfo.loginId;
        this.userEmail = authInfo.email;
        this.userName = authInfo.name;
        this.lastName = authInfo.lName
        this.middleName = authInfo.mName
        this.prefix = authInfo.prefix
        this.setAuthTimer(expiresIn / 1000);
        console.log(this.setAuthTimer);
        this.authStatusListener.next(true);
      }
    }

    private getAuthData(){
      const token = localStorage.getItem("token");
      const expirationDate =localStorage.getItem("expiration");
      const loginId =localStorage.getItem("userId");
      const userEMail = localStorage.getItem("email");
      const fname = localStorage.getItem("name");
      const mName = localStorage.getItem("middleName");
      const lName = localStorage.getItem("lastName");
      const prefix = localStorage.getItem("prefix");
      if(!token || !expirationDate || !loginId || !userEMail){return;}
      return{
        token:token,
        expirationDate:new Date(expirationDate),
        loginId:loginId,
        email:userEMail,
        name:fname,
        mName:mName,
        lName:lName,
        prefix:prefix
      }
    }

    onUpdatePassword(newPassword:string, oldPassword:string, email:string){
      const passwordData = {newPassword:newPassword,oldPassword:oldPassword, email:email}
      this.httpCli.post(this.BASE_URL +'api/logins/change-password', passwordData).subscribe((res)=>{
      console.log(res);
      })
    }


    private setAuthTimer(duration:number){
      console.log("AuthTimer" + duration);
      this.tokenTimer = setTimeout(()=>{
        this.logOut();
      },duration*1000);
    }

    private clearAuthData(){
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("loginId");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem('middleName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('prefix');
    }

    private saveAuthData(token:string,expirationDate:Date,userId:string,email:string,name:string,mName:string,lName:string,prefix:string){
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('loginId',userId);
      localStorage.setItem('email',email);
      localStorage.setItem('name',name);
      localStorage.setItem('middleName',mName);
      localStorage.setItem('lastName',lName);
      localStorage.setItem('prefix',prefix);
    }


}
