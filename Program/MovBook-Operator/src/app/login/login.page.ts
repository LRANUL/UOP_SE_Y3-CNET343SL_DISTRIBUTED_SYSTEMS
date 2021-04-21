import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
  }
  constructor(
    private authServ: AuthService,
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
          Validators.minLength(4),
          Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ]
      ]
    });
  }

  ngOnInit() {
    this.authServ.autoAuthUser();
  }

  get email() {
    return this.loginform.get('emailControl');
  }

  get password() {
    return this.loginform.get('passwordControl');
  }

  loginform: FormGroup;

  onLogin() {
    if (!this.loginform.valid) { return; }
    const email = this.loginform.get('emailControl').value;
    const password = this.loginform.get('passwordControl').value
    this.authServ.login(email, password);
    // Only for Beta Test
    // this.router.navigate(['operator']);

    this.loginform.reset();



    // this.loginform.reset();

  }

}
