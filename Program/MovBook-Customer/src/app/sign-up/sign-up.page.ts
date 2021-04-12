import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  signUpform: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.signUpform = formBuilder.group({
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
  }

  login()
  {
    this.router.navigate(['/login'])
  }
}
