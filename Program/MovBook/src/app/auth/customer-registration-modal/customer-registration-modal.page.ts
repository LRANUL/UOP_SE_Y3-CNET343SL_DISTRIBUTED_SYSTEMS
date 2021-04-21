import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-customer-registration-modal',
  templateUrl: './customer-registration-modal.page.html',
  styleUrls: ['./customer-registration-modal.page.scss'],
})
export class CustomerRegistrationModalPage implements OnInit {
    signUpform: FormGroup;
    constructor(public formBuilder: FormBuilder, private router: Router,private authServ:AuthService) {
      this.signUpform = formBuilder.group({
        prefix: [
          "",[
            Validators.required
          ]
        ],
        firstNameControl: [
          "",[
            Validators.required
          ]
        ],
        middleNameControl: [""],
        lastNameControl: [
          "",[
            Validators.required
          ]
        ],
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
        ],
        DateOfBirthControl: [
          "",[
            Validators.required
          ]
        ],
        phoneControl: [
          "",[
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.required
          ]
        ],
        streetAddressControl: [
          "",[
            Validators.required
          ]
        ],
        cityControl: [
          "",[
            Validators.required
          ]
        ],
        postalCodeControl: [
          "",[
            Validators.required
          ]
        ]
      });
     }
  
     get prefix(){
      return this.signUpform.get('prefix');
    }
  
    get firstName(){
      return this.signUpform.get('firstNameControl');
    }
  
    get middleName(){
      return this.signUpform.get('middleNameControl');
    }
  
    get lastName(){
      return this.signUpform.get('lastNameControl');
    }
  
    get dateOfBirth(){
      return this.signUpform.get('DateOfBirthControl');
    }
  
    get email(){
      return this.signUpform.get('emailControl');
    }
  
    get password(){
      return this.signUpform.get('passwordControl');
    }
  
    get phone(){
      return this.signUpform.get('phoneControl');
    }
  
    get streetAddress(){
      return this.signUpform.get('streetAddressControl');
    }
  
    get city(){
      return this.signUpform.get('cityControl');
    }
  
    get postalCode(){
      return this.signUpform.get('postalCodeControl');
    }
  
    ngOnInit() {
  
    }
  
    signUp()
    {
     console.log(this.signUpform.value)
     const email = this.signUpform.get('emailControl').value;
      const password =this.signUpform.get('passwordControl').value;
      const prefix =this.signUpform.get('prefix').value;
      const firstName =this.signUpform.get('firstNameControl').value;
      const middleName =this.signUpform.get('middleNameControl').value;
      const lastName =this.signUpform.get('lastNameControl').value;
      const streetAddress =this.signUpform.get('streetAddressControl').value;
      const city =this.signUpform.get('cityControl').value;
      const postalZipCode =this.signUpform.get('postalCodeControl').value;
      const phone =this.signUpform.get('phoneControl').value;
  
      this.authServ.createuser(email,password,prefix,firstName,lastName,middleName,streetAddress,city,postalZipCode,phone);
  
    }
  
    login()
    {
      this.router.navigate(['/login'])
    }

}
