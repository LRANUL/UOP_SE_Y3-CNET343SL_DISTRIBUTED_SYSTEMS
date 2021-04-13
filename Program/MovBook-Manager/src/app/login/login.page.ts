import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authServ:AuthService,public formBuilder: FormBuilder, private router: Router) {
    this.loginform = formBuilder.group({
    emailControl: [
      "",[
        Validators.minLength(4),
        Validators.pattern("[0-9a-z-A-Z@.]*"),
        Validators.required
      ]
    ],
    passwordControl: [
      "",[
        Validators.minLength(8),
        Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
        Validators.required
      ]
    ]
  });
}

  ngOnInit() {
    this.loginform =new FormGroup({
      'emailControl':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'passwordControl':  new FormControl(null,{validators:[Validators.required]})
    });
  }

  get email(){
    return this.loginform.get('emailControl');
  }

  get password(){
    return this.loginform.get('passwordControl');
  }


  loginform: FormGroup;

  login() {
    if (!this.loginform.valid) {
      return;
   }
  const email = this.loginform.value.email;
   const password = this.loginform.value.password;

  this.authServ.login(email,password);


  }
}
