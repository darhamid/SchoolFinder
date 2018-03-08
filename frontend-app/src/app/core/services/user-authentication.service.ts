import { ToastrService } from 'ngx-toastr';
import { Constants } from './../appsettings/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/do';

@Injectable()
export class UserAuthenticationService {
  constructor(private http: HttpClient, private toasterService: ToastrService) {
  }
  loggedInFlag;
  signIn(email: any, password: any) {
    const data = {
      email: email,
      password: password
    };
    return this.http.post(Constants.loginURL, data)
      .do((res: SeverResponse) => this.setSession(res.data));
  }
  signOut(user: any) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  userAuthenticated(token: any) {
    console.log(token);
  }
  setSession(authResult) {
    if (authResult) {
      const expiresAt = moment().add(authResult.expiresIn, 'second');
      localStorage.setItem('id_token', authResult.token);
      localStorage.setItem('user', JSON.stringify(authResult.user));
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem('compareList', "[]");
    }

  }
  setLoggedInFlag() {
    this.loggedInFlag = localStorage.getItem('id_token') && moment().isBefore(this.getExpiration());
  }
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.toasterService.info('Successfully Logged Out!');
    return this.http.get(Constants.logoutURL).map((res: SeverResponse) => res.data);
  }

  public isLoggedIn() {
    return localStorage.getItem('id_token') && moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

interface SeverResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: number;
}
