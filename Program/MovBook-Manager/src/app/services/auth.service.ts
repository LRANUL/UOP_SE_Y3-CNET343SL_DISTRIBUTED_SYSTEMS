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

    constructor(private httpCli:HttpClient, private router:Router){}

      login(email:string,passwrd:string){
        const loginData= {email:email , password: passwrd };
          this.httpCli.post<{token:string,expiresIn:number,userId:string,email:string,name:string}>("http://localhost:5000/api/users/login",loginData).subscribe(res =>{
              const token = res.token;
              this.token =token
              if(this.token){
                this.userEmail =res.email;
                this.userName = res.name;
                this.userId = res.userId;
                const expiresInDuration = res.expiresIn
                const nowDate = new Date();
                const expirationDate = new Date(nowDate.getTime() + expiresInDuration*1000);
                this.saveAuthData(token, expirationDate,this.userId,this.userEmail,this.userName);
                this.authStatusListener.next(true);
                this.AuthStatus = true;
                this.router.navigate(['/']);
              }
              console.log(res);

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
        const name = localStorage.getItem("name");
        if(!token || !expirationDate || !userId || !userEMail){return;}
        return{
          token:token,
          expirationDate:new Date(expirationDate),
          userId:userId,
          email:userEMail,
          name:name
        }
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

      }

      private saveAuthData(token:string,expirationDate:Date,userId:string,email:string,name:string){
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId',userId);
        localStorage.setItem('email',email);
        localStorage.setItem('name',name);

      }
}
