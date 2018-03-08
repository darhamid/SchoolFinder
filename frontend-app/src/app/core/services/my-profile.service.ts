import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './../appsettings/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MyProfileService {

  constructor(private http: HttpClient) { }

  getMyProfile() {
    let loggedInUser: any;
    loggedInUser = localStorage.getItem('user');
    loggedInUser = JSON.parse(loggedInUser);
    const reqUrl = Constants.fmtURL(Constants.profileLoginUrl,loggedInUser._id);
    return this.http.get(reqUrl)
    .map((res: SeverResponse) => res);
  }
}

interface SeverResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: number;
}
