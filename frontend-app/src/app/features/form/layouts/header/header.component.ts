import { UserAuthenticationService } from './../../../../core/services/user-authentication.service';
import { error } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginLabel :any;
  checkroute : boolean = false; 

  constructor(private http: HttpClient,
    private router: Router,
    private userAuthenticationService: UserAuthenticationService) { }
    private toggleMenubar: boolean = false;

  ngOnInit() {

  }
 
  checkLoggedIn(){
     let check = this.userAuthenticationService.isLoggedIn();
     if(check)
      this.loginLabel = "My Account";
      else
      this.loginLabel = "Login/Registration";

     return check;
  }

  onSignOut() {
    this.userAuthenticationService.logout().subscribe(
      (response) => {
        this.router.navigateByUrl('/');
      },
      (error) => { console.log(error); }
    )
  }

  checkRoute(){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if(e.url !== '/' && e.url !== '/home')
          this.checkroute = true;
        else
          this.checkroute = false;
      }
    });

    return this.checkroute;
  }
}
