import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router) {
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

  get email(){
    return this.loginform.get('emailControl');
  }

  get password(){
    return this.loginform.get('passwordControl');
  }


  ngOnInit() {
  }

  login()
  {
  console.log("vds");
   console.log(this.loginform.value)
  }

  signup()
  {
   this.router.navigate(['/sign-up'])
  }
}
