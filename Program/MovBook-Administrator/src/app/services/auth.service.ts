import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { Router } from "@angular/router";

@Injectable({ providedIn:'root' })
export class AuthService{
    private AuthStatus =false;
    private token:string;
    private authStatusListener =new Subject<boolean>();
    private tokenTimer:any;
    private userId:string;
    private userEmail:string;
    private userName:string;
    private middleName:string;
    private lastName:string;
    private prefix:string;

    constructor(private httpCli:HttpClient, private router:Router){}



      login(email:string,passwrd:string){
        const loginData= {email:email , password: passwrd };
          this.httpCli.post<{token:string,expiresIn:number,userId:string,email:string,fName:string,mName:string,lName:string,prefix:string}>("http://localhost:8400/api/logins/Admin-login",loginData).subscribe(res =>{
              const token = res.token;
              this.token =token
              if(this.token){
                this.userEmail =res.email;
                this.userName = res.fName;
                this.userId = res.userId;
                const expiresInDuration = res.expiresIn;
                this.middleName =res.mName;
                this.lastName = res.lName;
                this.prefix = res.prefix;
                const nowDate = new Date();
                const expirationDate = new Date(nowDate.getTime() + expiresInDuration*1000);
                this.saveAuthData(token, expirationDate,this.userId,this.userEmail,this.userName,this.middleName,this.lastName,this.prefix);
                this.authStatusListener.next(true);
                this.AuthStatus = true;
                this.router.navigate(['/administrator/manager-accounts']);
              }
              console.log(res);

          })
      }

      onEmailSent(email:string){
        const emailSent = {email:email}
        this.httpCli.post<{message:string}>('http://localhost:5000/api/logins/forgotPassword',emailSent).subscribe(res=>{
          console.log(res);
        })
      }

      sendNewPassword(password:string, token:string, email:string){
      const passwordData = {password:password, passwordToken:token , email:email};
        this.httpCli.post<{message:string}>('http://localhost:5000/api/logins/new-password',passwordData).subscribe(res=>{
          console.log(res);
        })
      }

      LoginCheck(email:string, password:string){
        const loginDetails ={email:email , password:password}
        this.httpCli.post('http://localhost:8400/api/logins/Admin-login-check',loginDetails).subscribe((res)=>{
        console.log(res);
        this.router.navigate(['/administrator/settings-sub-page/edit-admin']);
        })
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
        this.userId =null;
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
          this.userId = authInfo.userId;
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
        const userId =localStorage.getItem("userId");
        const userEMail = localStorage.getItem("email");
        const fname = localStorage.getItem("name");
        const mName = localStorage.getItem("middleName");
        const lName = localStorage.getItem("lastName");
        const prefix = localStorage.getItem("prefix");
        if(!token || !expirationDate || !userId || !userEMail){return;}
        return{
          token:token,
          expirationDate:new Date(expirationDate),
          userId:userId,
          email:userEMail,
          name:fname,
          mName:mName,
          lName:lName,
          prefix:prefix
        }
      }

      onUpdatePassword(newPassword:string, oldPassword:string, email:string){
        const passwordData = {newPassword:newPassword,oldPassword:oldPassword, email:email}
        this.httpCli.post("http://localhost:8400/api/logins/change-password", passwordData).subscribe((res)=>{
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
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem('middleName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('prefix');

      }

      private saveAuthData(token:string,expirationDate:Date,userId:string,email:string,name:string,mName:string,lName:string,prefix:string){
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId',userId);
        localStorage.setItem('email',email);
        localStorage.setItem('name',name);
        localStorage.setItem('middleName',mName);
        localStorage.setItem('lastName',lName);
        localStorage.setItem('prefix',lName);

      }


}
