import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './../../../core/services/user-authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  error: any;

  constructor(private userAuthenticationService: UserAuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }
  onSignin() {

    this.userAuthenticationService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/']);
        } else {
          this.error = response.message;
        }
      },
      (error) => { console.log(error); }
    );
  }

}
