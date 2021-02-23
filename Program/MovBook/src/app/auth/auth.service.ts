import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { Router } from "@angular/router";

@Injectable({ providedIn:'root' })
export class AuthService{
    private AuthStatus =false;
    private token:string;
    private authStatusListener =new Subject<boolean>();

    constructor(private httpCli:HttpClient, private router:Router){}

    createuser(email:string, password:string, name:string, address:string, phone:number){
        const AuthData = {email:email , password: password, name: name, address:address, phone:phone  };
        console.log(AuthData);
        this.httpCli.post("http://localhost:5000/api/users/signup",AuthData).subscribe(response =>{
            console.log(response);
        })
      }

      login(email:string,passwrd:string){
        const loginData= {email:email , password: passwrd };
          this.httpCli.post<{token:string}>("http://localhost:5000/api/users/login",loginData).subscribe(res =>{
              const token = res.token;
              this.token =token
              if(this.token){
                this.authStatusListener.next(true);
                this.AuthStatus = true;
                this.router.navigate(['/']);
              }
              console.log(this.token);
    
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
        this.AuthStatus =false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
      }
}