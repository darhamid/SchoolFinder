import { Router } from '@angular/router';
import { UserAuthenticationService } from './../../../core/services/user-authentication.service';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
  animations: [
    trigger('myProfileSlideInOut', [
      state('in', style({
        marginLeft: '0'
        //transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        marginLeft: '-330px'
        //transform: 'translate3d(-300px, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class MyaccountComponent implements OnInit {

  myProfileState: string = 'in';
  user: any = JSON.parse(localStorage.getItem("user"));
  slideVisible = false;

  constructor(private userAuthenticationService: UserAuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  onSignOut() {
    this.userAuthenticationService.logout().subscribe(
      (response) => {
        this.router.navigateByUrl('/');
      },
      (error) => { console.log(error); }
    )
  }

  myProfileToggle() {
    // 1-line if statement that toggles the value:
    this.myProfileState = this.myProfileState === 'out' ? 'in' : 'out';
    this.slideVisible = !this.slideVisible;
  }
}
