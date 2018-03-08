import { UserAuthenticationService } from './../core/services/user-authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.css']
})
export class LandingViewComponent implements OnInit {

  constructor(private userAuth: UserAuthenticationService) { }

  ngOnInit() {
    this.userAuth.setLoggedInFlag();
  }

}
