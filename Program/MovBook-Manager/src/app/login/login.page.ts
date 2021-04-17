import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Declaration | Initialization - Handling visibility of splash screen content
  splashContent: Boolean = true;

  // Declaration | Initialization - Handling visibility of login screen content
  loginContent: Boolean = false;

  constructor(
    private authServ:AuthService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginform = formBuilder.group({
    emailControl: [
      "",
      [
        Validators.minLength(4),
        Validators.pattern("[0-9a-z-A-Z@.]*"),
        Validators.required
      ]
    ],
    passwordControl: [
      "",
      [
        Validators.minLength(6),
        Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
        Validators.required
      ]
    ]});
  }

  ngOnInit() {
    // Setting timer for the splash screen
    setTimeout(() => {
      this.splashContent = false;
      this.loginContent = true;
    }, 3000);
  }

  get email(){
    return this.loginform.get('emailControl');
  }

  get password(){
    return this.loginform.get('passwordControl');
  }

  loginform: FormGroup;

  onLogin(){
    if(!this.loginform.valid){ return; }
    const email = this.loginform.get('emailControl').value;
    const password =this.loginform.get('passwordControl').value
    console.log(email + " " +password);
    // this.authServ.login(email,password);
    this.loginform.reset();
     // Only for Beta Test
     this.router.navigate(['manager/dashboard']);
  }


}
