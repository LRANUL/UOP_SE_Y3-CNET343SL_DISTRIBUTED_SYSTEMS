import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router, private authServ:AuthService) {
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
          Validators.minLength(6),
          Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ]
      ]
    });
  }

  get email(){
    return this.loginform.get('emailControl');
  }

  get password(){
    return this.loginform.get('passwordControl');
  }


  ngOnInit() {
  }



  onLogin(){
    if(!this.loginform.valid){ return; }
    const email = this.loginform.get('emailControl').value;
    const password =this.loginform.get('passwordControl').value
    console.log(email + " " +password);
    this.authServ.login(email,password);
    this.loginform.reset();
     // Only for Beta Test
     //this.router.navigate(['manager/dashboard']);
  }

  signup()
  {
   this.router.navigate(['/sign-up'])
  }
}
