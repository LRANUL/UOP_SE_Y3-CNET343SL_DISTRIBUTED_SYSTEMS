import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  form:FormGroup;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':new FormControl(null,{validators:[Validators.required,Validators.email]})
    });
  }

  onSent(){
    this.authService.onEmailSent(this.form.value.email);
    this.form.reset();
    this.router.navigate(['/login']);
  }


}
