import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  form:FormGroup;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email':new FormControl(null,{validators:[Validators.required,Validators.email]})
    });
  }

  onSent(){
    this.authService.onEmailSent(this.form.value.email);
    this.router.navigate(['/login']);
  }
}
