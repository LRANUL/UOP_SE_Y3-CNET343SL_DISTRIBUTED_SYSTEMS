import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-customer-registration-modal',
  templateUrl: './customer-registration-modal.page.html',
  styleUrls: ['./customer-registration-modal.page.scss'],
})
export class CustomerRegistrationModalPage implements OnInit {
  userform:FormGroup;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userform = new FormGroup({
      'email':new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.minLength(3)]}),
      'password':  new FormControl(null,{validators:[Validators.required]}),
      'name':  new FormControl(null,{updateOn:'blur',validators:[Validators.required]}),
      'address':  new FormControl(null,{updateOn:'blur',validators:[Validators.required]}),
      'phone':  new FormControl(null,{validators:[Validators.required]}),
      
    });
  }
  

  onAddUser(){
    if(this.userform.invalid){return}
    this.authService.createuser(
      this.userform.value.email,
      this.userform.value.password,
      this.userform.value.name,
      this.userform.value.address,
      this.userform.value.phone);
      
  }

}
