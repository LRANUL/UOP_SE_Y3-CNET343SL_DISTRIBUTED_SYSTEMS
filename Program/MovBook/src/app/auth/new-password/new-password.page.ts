import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

    constructor(public route:ActivatedRoute, private authService:AuthService, private router:Router) { }
    form:FormGroup;
    email:string;
    token:string;
    ngOnInit() {
      this.form = new FormGroup({
        'password':new FormControl(null,{validators:[Validators.required]}),
        'rePassword':new FormControl(null,{validators:[Validators.required]})
      });
      this.route.paramMap.subscribe((x:ParamMap)=>{
        console.log(x);
        if(x.has('email') && x.has('token')){ this.email = x.get('email'); this.token = x.get('token')}
        else{ this.router.navigate(['/home']); }
      });
    }
  
    onPasswardSent(){
      if(this.email && this.token){
        this.authService.sendNewPassword(this.form.value.password,this.token,this.email)
      }
      
    }
}
