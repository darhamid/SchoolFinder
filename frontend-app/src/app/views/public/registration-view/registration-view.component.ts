import { UserAuthenticationService } from './../../../core/services/user-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../../../core/services/user-registration.service';

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.css']
})
export class RegistrationViewComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private router: Router, private userRegistrationService: UserRegistrationService, private toasterService: ToastrService ,private userAuthenticationService:UserAuthenticationService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup ({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone1': new FormControl(null, [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(10), Validators.minLength(9)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'termsandconditions': new FormControl(null, [Validators.required])
    }, this.passwordMatchValidator);
  }

  isFieldValid(field: string) {
    return this.registrationForm.get(field).touched && this.registrationForm.get(field).invalid;
  }

  isPasswordValid(password:string){
    return this.registrationForm.get(password).touched && this.registrationForm.get(password).invalid;
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get("confirmPassword").value === group.get("password").value ? null : {'mismatch': true};
  }

  onRegistrationSubmit(){
    this.userRegistrationService.registerUser(this.registrationForm.value).subscribe(
      (response) => { 
        if(response.statusCode == 500){
          this.toasterService.error('Email id already exists!');
        }
        else if(response.success == true){
          this.toasterService.info('Successfully registered!');
            this.userAuthenticationService.signIn(this.registrationForm.value.email,this.registrationForm.value.password).subscribe(
              (response: any) => {
                if (response.success) {
                  this.router.navigate(['/']);
                } else {
                  this.toasterService.error = response.message;
                }
              },
              (error) => { console.log(error); }
            );
        }
      },       
      (error) => {console.log(error);}
    )
  }
}